#!/usr/bin/env node
/**
 * Records the narration for the kids stories: one clip per story paragraph,
 * written into `public/audio/kids/story/` and indexed, together with any
 * painted panels found under `public/assets/kids/story-art/`, in
 * `public/data/kidsStoryMedia.json` — so the app plays a real voice with no
 * runtime API call and no cost per read.
 *
 *   node scripts/generateStoryMedia.mjs --story=yusuf --preview
 *   node scripts/generateStoryMedia.mjs --story=yusuf --chapter=the-dream
 *   node scripts/generateStoryMedia.mjs --all --budget=60
 *   node scripts/generateStoryMedia.mjs --all --manifest   # rebuild the index only
 *   node scripts/generateStoryMedia.mjs --all --list        # count paragraphs
 *
 * Needs GEMINI_API_KEY in the environment or in server/.env. Re-running is
 * safe: paragraphs already recorded are skipped and the manifest is rebuilt
 * from what is on disk, so the library can be recorded a few parts at a time.
 * A paragraph with no clip is read by the browser voice in the app instead.
 */
import fs from 'fs';
import path from 'path';
import os from 'os';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import ts from 'typescript';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const require = createRequire(import.meta.url);

dotenv.config({ path: path.join(projectRoot, 'server/.env') });

const API_KEY = process.env.GEMINI_API_KEY;
const TTS_MODEL = process.env.STORY_TTS_MODEL || 'gemini-2.5-flash-preview-tts';
const VOICES = {
  en: process.env.STORY_VOICE_EN || 'Kore',
  ur: process.env.STORY_VOICE_UR || 'Zephyr',
};

const CLIPS_DIR = path.join(projectRoot, 'public/audio/kids/story');
const ART_DIR = path.join(projectRoot, 'public/assets/kids/story-art');
const MANIFEST_PATH = path.join(projectRoot, 'public/data/kidsStoryMedia.json');

function assertApiKey() {
  if (!API_KEY) {
    console.error('GEMINI_API_KEY is not set. Put it in server/.env or export it before running.');
    process.exit(1);
  }
}

// ---------- story data ----------

const moduleCache = new Map();

/**
 * The data files are TypeScript that plain Node cannot load, and Node's own
 * TS handling reads them back as ES modules. Transpile each to CommonJS (the
 * transpiler erases type-only imports) and run it with an exports object the
 * loader owns. A module's own imports are rewritten to a loader call rather
 * than a fixed path, because `./adam` cannot be resolved until it is actually
 * loaded — resolution happens at require time, not rewrite time.
 */

/** `./adam` written in TypeScript resolves to ./adam.ts, or ./adam/index.ts. */
function resolveDataModule(baseDirectory, specifier) {
  const base = path.resolve(baseDirectory, specifier);
  const candidates = [base, `${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts'), path.join(base, 'index.tsx')];
  const hit = candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!hit) throw new Error(`Cannot resolve story data module ${specifier} from ${baseDirectory}`);
  return hit;
}

/**
 * Story files import each other relatively and use tsconfig baseUrl (`src`)
 * absolutes like `data/kids/...` — Node understands neither after transpile.
 * Third-party packages are left alone for Node's own resolution.
 */
const LOCAL_MODULE_ROOTS = ['data/', 'types/', 'features/', 'utils/', 'constants/', 'hooks/', 'services/', 'stores/'];

function rewriteRequires(source, fromFile) {
  return source.replace(/require\((['"])([^'"]+)\1\)/g, (match, _quote, specifier) => {
    const baseDirectory = specifier.startsWith('.')
      ? path.dirname(fromFile)
      : LOCAL_MODULE_ROOTS.some((root) => specifier.startsWith(root))
        ? path.join(projectRoot, 'src')
        : null;
    if (!baseDirectory) return match;
    return `__loadTs(${JSON.stringify(specifier)}, ${JSON.stringify(baseDirectory)})`;
  });
}

function loadTsFile(absFile) {
  const compiled = ts.transpileModule(fs.readFileSync(absFile, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React },
    fileName: absFile,
  }).outputText;

  const exports = {};
  const module = { exports };
  const run = new Function(
    'exports',
    'module',
    'require',
    '__filename',
    '__dirname',
    '__loadTs',
    rewriteRequires(compiled, absFile),
  );
  run(exports, module, (specifier) => require(specifier), absFile, path.dirname(absFile), loadTsModule);
  return module.exports;
}

/** Called from inside the transpiled modules themselves, for each of their imports. */
function loadTsModule(specifier, baseDirectory) {
  const abs = resolveDataModule(baseDirectory, specifier);
  const cached = moduleCache.get(abs);
  if (cached) return cached;

  // Two story modules can import each other; publish the exports object before
  // filling it, so a cycle reads the same object the importer would get.
  const exports = {};
  moduleCache.set(abs, exports);
  Object.assign(exports, loadTsFile(abs));
  return exports;
}

function loadStoryModule(modulePath) {
  return loadTsModule(path.resolve(projectRoot, modulePath), projectRoot);
}

function collectStories(storyFilter) {
  const sources = ['src/data/kids/storiesV2/index.ts', 'src/data/kids/sahabiV2/index.ts'];
  const stories = [];
  for (const source of sources) {
    for (const value of Object.values(loadStoryModule(source))) {
      // The index files export arrays of stories, so take every story-shaped
      // array rather than hardcoding names.
      if (!Array.isArray(value)) continue;
      stories.push(...value.filter((entry) => entry && Array.isArray(entry.chapters) && typeof entry.id === 'string'));
    }
  }
  const unique = new Map(stories.map((story) => [story.id, story]));
  const list = [...unique.values()].sort((a, b) => a.id.localeCompare(b.id));
  if (!storyFilter || storyFilter === 'all') return list;
  const wanted = storyFilter.split(',').map((id) => id.trim()).filter(Boolean);
  return list.filter((story) => wanted.includes(story.id));
}

/** One paragraph of one part — the unit the app shows as a comic panel. */
function panelsOf(story, chapterFilter) {
  const wanted =
    chapterFilter && chapterFilter !== 'all'
      ? new Set(chapterFilter.split(',').map((id) => id.trim()).filter(Boolean))
      : null;

  const panels = [];
  for (const chapter of story.chapters) {
    if (wanted && !wanted.has(chapter.id)) continue;
    chapter.paragraphs.forEach((paragraph, index) => {
      panels.push({ id: `${chapter.id}/p${index}`, chapterId: chapter.id, index, paragraph });
    });
  }
  return panels;
}

function hasUrduText(paragraph) {
  return typeof paragraph.ur === 'string' && paragraph.ur.trim().length > 0;
}

// ---------- Gemini call ----------

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function callGemini(model, body) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
  let lastError;

  for (let attempt = 1; attempt <= 4; attempt += 1) {
    let response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch (error) {
      lastError = error;
      await sleep(1500 * attempt);
      continue;
    }

    if (response.status === 429 || response.status >= 500) {
      lastError = new Error(`${response.status} ${response.statusText}`);
      await sleep(Math.max(1500 * attempt, (Number(response.headers.get('retry-after')) || 0) * 1000));
      continue;
    }

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      const status = payload?.error?.status;
      const message = payload?.error?.message || `${response.status} ${response.statusText}`;
      // A refused prompt is a content problem, not a transient one — no retry.
      if (status === 'SAFETY' || status === 'BLOCKLIST' || status === 'PROHIBITED_CONTENT') {
        return { error: `refused: ${message}` };
      }
      lastError = new Error(message);
      await sleep(1500 * attempt);
      continue;
    }

    const candidate = payload?.candidates?.[0];
    if (!candidate) return { error: 'empty response' };
    return { data: candidate };
  }

  return { error: `giving up after retries: ${lastError?.message ?? 'unknown'}` };
}

function pcmToWav(pcmBytes, sampleRate) {
  const header = Buffer.alloc(44);
  header.write('RIFF', 0);
  header.writeUInt32LE(36 + pcmBytes.length, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(1, 22); // mono
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(sampleRate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36);
  header.writeUInt32LE(pcmBytes.length, 40);
  return Buffer.concat([header, pcmBytes]);
}

/**
 * The narrator reads the paragraph as it is written — nothing is added around
 * it, so what a child hears is exactly what the page shows.
 */
async function recordClip(story, panel, language, previewDir) {
  const folder = path.join(previewDir ?? CLIPS_DIR, story.id, panel.id);
  if (!previewDir && fs.existsSync(folder) && fs.readdirSync(folder).some((file) => new RegExp(`narration\\.${language}\\.(wav|mp3)$`, 'i').test(file))) {
    return { status: 'cached', target: folder };
  }
  // Never speak English words into an Urdu track — the app plays the English
  // clip for that paragraph until its translation exists.
  if (language === 'ur' && !hasUrduText(panel.paragraph)) return { status: 'skipped', reason: 'no Urdu text' };

  const text = ((language === 'ur' ? panel.paragraph.ur : panel.paragraph.en) || '').trim();
  if (!text) return { status: 'skipped', reason: 'empty paragraph' };

  const result = await callGemini(TTS_MODEL, {
    contents: [{ parts: [{ text }] }],
    generationConfig: {
      responseModalities: ['AUDIO'],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: VOICES[language] } } },
    },
  });
  if (result.error) return { status: 'failed', reason: result.error };

  const parts = result.data?.content?.parts ?? [];
  const inline = (parts.find((part) => part.inlineData ?? part.inline_data) ?? {}).inlineData
    ?? (parts.find((part) => part.inlineData ?? part.inline_data) ?? {}).inline_data;
  if (!inline?.data) return { status: 'failed', reason: 'no audio returned' };

  const mimeType = inline.mimeType ?? '';
  const bytes = Buffer.from(inline.data, 'base64');
  // The API answers with headerless signed-16-bit PCM; wrap it so the browser
  // plays it. Compressing to mp3 is an optional `ffmpeg -i in -c:a libmp3lame`
  // pass afterwards, which the manifest picks up automatically.
  const sampleRate = Number(/rate=(\d+)/.exec(mimeType)?.[1]) || 24000;
  const isMp3 = /\.mp3$/i.test(mimeType);
  const wav = isMp3 ? bytes : pcmToWav(bytes, sampleRate);

  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, `narration.${language}${isMp3 ? '.mp3' : '.wav'}`), wav);
  return { status: 'written', target: folder };
}

// ---------- manifest ----------

const CLIP_NAME = /^narration\.(en|ur)\.(wav|mp3)$/i;

function clipFilesIn(folder) {
  if (!fs.existsSync(folder)) return {};
  const byLanguage = {};
  for (const file of fs.readdirSync(folder)) {
    const match = CLIP_NAME.exec(file);
    if (match) byLanguage[match[1].toLowerCase()] = file;
  }
  return byLanguage;
}

/**
 * Every panel folder of one story, as `[sceneId, folder]`.
 * Panels nest under the part (`the-dream/p0`); a flat part folder is read too,
 * so hand-placed media is found as well.
 */
function panelFoldersIn(storyFolder) {
  if (!fs.existsSync(storyFolder)) return [];
  const found = [];
  for (const chapterId of fs.readdirSync(storyFolder)) {
    const chapterFolder = path.join(storyFolder, chapterId);
    if (!fs.statSync(chapterFolder).isDirectory()) continue;
    found.push([chapterId, chapterFolder]);
    for (const entry of fs.readdirSync(chapterFolder)) {
      const panelFolder = path.join(chapterFolder, entry);
      if (fs.statSync(panelFolder).isDirectory()) found.push([`${chapterId}/${entry}`, panelFolder]);
    }
  }
  return found;
}

const IMAGE_NAME = /^image\.(webp|png|jpe?g)$/i;

function buildManifest(stories) {
  const narration = {};
  const paintings = {};

  for (const story of stories) {
    const byPanel = {};
    for (const [sceneId, folder] of panelFoldersIn(path.join(CLIPS_DIR, story.id))) {
      const clips = clipFilesIn(folder);
      if (Object.keys(clips).length) byPanel[sceneId] = clips;
    }
    if (Object.keys(byPanel).length) narration[story.id] = byPanel;

    const byPainting = {};
    for (const [sceneId, folder] of panelFoldersIn(path.join(ART_DIR, story.id))) {
      const file = fs.readdirSync(folder).find((name) => IMAGE_NAME.test(name));
      if (file) byPainting[sceneId] = file;
    }
    if (Object.keys(byPainting).length) paintings[story.id] = byPainting;
  }

  return { generatedAt: new Date().toISOString(), narration, paintings };
}

function writeManifest(stories) {
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true });
  const manifest = buildManifest(stories);
  fs.writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  const panels = Object.values(manifest.narration).reduce((total, byPanel) => total + Object.keys(byPanel).length, 0);
  const clips = Object.values(manifest.narration).reduce(
    (total, byPanel) => total + Object.values(byPanel).reduce((sum, clip) => sum + Object.keys(clip).length, 0),
    0,
  );
  console.log(
    `manifest: ${panels} panels narrated, ${clips} clips, ${Object.keys(manifest.paintings).length} stories with painted panels — ${MANIFEST_PATH}`,
  );
}

// ---------- CLI ----------

function parseArgs(argv) {
  const flags = {};
  for (const arg of argv) {
    const match = /^--([^=]+)(?:=(.*))?$/.exec(arg);
    if (match) flags[match[1]] = match[2] === undefined ? true : match[2];
  }
  return flags;
}

/** --list: count the paragraphs to record without calling the API (no key needed). */
function printInventory(stories, languages) {
  let panels = 0;
  let urduPanels = 0;
  for (const story of stories) {
    const list = panelsOf(story, undefined);
    panels += list.length;
    urduPanels += list.filter((panel) => hasUrduText(panel.paragraph)).length;
    console.log(`${story.id.padEnd(16)} ${String(list.length).padStart(4)} panels  ${story.nameEnglish}`);
  }
  console.log(
    `\n${stories.length} stories, ${panels} panels -> ${panels} English clips + ${urduPanels} Urdu clips` +
      ` (${panels - urduPanels} paragraphs still have no Urdu text and play the English voice)`,
  );
}

async function runPool(tasks, concurrency) {
  let cursor = 0;
  const results = [];
  async function worker() {
    while (cursor < tasks.length) {
      results.push(await tasks[cursor++]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, tasks.length) }, worker));
  return results;
}

function log(outcome, label) {
  const mark = { written: '+', cached: '=', skipped: '-', failed: '!' }[outcome.status] ?? '?';
  console.log(`${mark} ${label}${outcome.reason ? ` (${outcome.reason})` : ''}`);
}

async function main() {
  const flags = parseArgs(process.argv.slice(2));
  const previewDir = flags.preview ? path.join(os.tmpdir(), 'kids-story-narration-preview') : null;
  const concurrency = Math.max(1, Number(flags.concurrency) || 2);
  const languages = (flags.langs ?? 'en,ur').split(',').map((code) => code.trim()).filter(Boolean);
  const stories = collectStories(flags.story ?? (flags.all ? 'all' : undefined));

  if (!stories.length) {
    console.error(`No stories matched --story=${flags.story}. Try --all or an id such as yusuf.`);
    process.exit(1);
  }

  if (flags.list) {
    printInventory(stories, languages);
    return;
  }

  // Clips added by any means (a hand-recorded narrator) still get indexed.
  if (flags.manifest) {
    writeManifest(stories);
    return;
  }

  assertApiKey();
  if (previewDir) fs.rmSync(previewDir, { recursive: true, force: true });

  const work = [];
  for (const story of stories) {
    for (const panel of panelsOf(story, flags.chapter)) {
      for (const language of languages) {
        work.push(async () => {
          const outcome = await recordClip(story, panel, language, previewDir);
          log(outcome, `${story.id}/${panel.id} ${language.toUpperCase()}`);
          return outcome;
        });
      }
    }
  }

  const budget = flags.budget ? Number(flags.budget) : Infinity;
  const limited = Number.isFinite(budget) ? work.slice(0, budget) : work;
  console.log(
    `${stories.length} stor${stories.length === 1 ? 'y' : 'ies'}, ${limited.length} clip(s)` +
      (Number.isFinite(budget) && work.length > limited.length ? ` — budget ${budget}, ${work.length - limited.length} deferred` : '') +
      (previewDir ? ` — PREVIEW run, written to ${previewDir}` : ''),
  );

  const outcomes = await runPool(limited, concurrency);

  if (previewDir) {
    console.log(`preview clips ready in ${previewDir} (app not touched; no manifest written)`);
  } else {
    writeManifest(stories);
  }

  const failed = outcomes.filter((outcome) => outcome.status === 'failed');
  if (failed.length) {
    console.warn(`${failed.length} clip(s) failed — rerun the same command to retry only what is missing`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
