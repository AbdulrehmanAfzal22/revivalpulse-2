# Narration and responsive UI update

## Voice changes available now

- Corrected the voice ranking bug: natural/neural voices now take priority over legacy robotic defaults.
- Added separate English and Urdu device-voice choices, short previews and a saved reading-speed setting in Settings and every story chapter.
- Default delivery is gentle, with normal pitch rather than an artificially raised pitch.
- A paragraph shown in English uses an English narrator, even when the Urdu tab is selected. An Urdu paragraph requires an Urdu voice; it is never deliberately read through an English fallback voice.
- Whole-chapter reading now follows the same per-paragraph recorded-audio-first queue as the picture buttons. Previously, the whole-chapter button bypassed existing recorded clips.
- Fixed overlapping preview/story audio, cancellation, stale playback callbacks, language changes and recording-error fallback.
- English fallback text remains left-to-right. Urdu text, notes and source explanations use right-to-left direction independently of their chapter title.

Device narration depends on the voices installed or exposed by the browser. A website cannot install a system voice by assigning its name. The controls therefore list real available voices and clearly report a missing Urdu voice.

## Natural recorded voices — pending explicit approval

Generic samples of the proposed narrators are included in `docs/narrator-samples/`:

- `english-jenny.mp3`: Microsoft Jenny, English.
- `urdu-uzma.mp3`: Microsoft Uzma, Pakistani Urdu.

These are short sample sentences, not recordings of the story library.

The full-library recording step is NOT completed. Automatic approval review blocked sending the project's English and Urdu story text to Microsoft's external speech service because explicit approval for that transfer was missing. No pending project recordings have been enabled in the delivered application.

Once that transfer is explicitly approved, the included recording utility can produce and index local MP3s for the 1,336 English paragraphs and the 959 paragraphs with Urdu text. It leaves untranslated paragraphs in English; it does not invent Urdu translations.

Optional generation setup after approval:

```bash
python3 -m pip install -r scripts/requirements-narration.txt
node scripts/exportStoryNarration.cjs /absolute/path/narration-source.json
python3 scripts/recordNaturalStoryNarration.py --source /absolute/path/narration-source.json --work /absolute/path/narration-work
```

The utility also requires ffmpeg on PATH. It uses verified TLS and honors the runtime's trusted CA configuration. MP3s are generated ahead of deployment; the app itself needs no speech-generation API key. Recorded speech text omits parenthetical source citations and expands honorific abbreviations for a smoother reading; visible story text and citations remain unchanged.

## UI repairs

- Mobile drawer actions wrap within the drawer; the account button no longer spills into the backdrop on a narrow phone.
- Account popovers retain a safe anchor within the drawer.
- Dialogs are capped to the dynamic viewport height and scroll internally. Short landscape screens retain reachable headings and close controls.
- Narrator controls use a responsive grid with full-width, shrinkable selects and comfortable touch targets.
- Mixed English/Urdu fields use their own reading direction.

## Run the project

```bash
npm install --legacy-peer-deps
npm start
```

The existing image improvements remain included. No new service account or environment key is required for device narration.

## Validation

- Production build passed.
- 62 tests passed across four voice/story suites.
- 234 Chromium viewport checks completed across 39 representative routes: 320, 390, 768, 1024 and 1440 pixels in light mode, plus 390 pixels in dark mode. No page-wide horizontal overflow, blank-page or story-header control-overlap failures were detected in that sweep.
- Manual mobile checks verified the drawer account action, a 400-pixel-high dialog, a scrolling language popup and mixed English/Urdu direction.
- This is a responsive rendering review, not a certification of every browser or authenticated/backend workflow. Details are in `quality-report.json`.
