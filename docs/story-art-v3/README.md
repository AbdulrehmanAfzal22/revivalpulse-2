# Story illustration update, version 3

Open `index.html` in this folder after extracting the project ZIP. The gallery contains every paragraph picture and every chapter cover, grouped by story using its dropdown. It uses local thumbnail files and works without a server.

## What changed

The previous check established different SVG/file hashes, but did not adequately detect similar-looking compositions. This revision plans pictures across whole stories, rather than restarting the same choices in each chapter. Chapter covers have separate reservations from their paragraphs.

- 25 Prophet stories and 44 Companion stories.
- 374 separately planned chapter covers and 1,336 paragraph illustrations.
- 32 authored scene sets, with subject-appropriate placement. Buildings and seas never use the small-object table/shelf layouts.
- Additional native drawings of home interiors/courtyards/windows, prayer mats, scales, books and pens, wells, gardens, seedlings, resting places and the Kaaba.
- A subject cannot repeat the same set within one story. The complete subject/set/pose combination is also reserved globally.
- All 15 existing paintings remain in their original locations. Three newly generated paintings have been added for the Midian market, honest weights and measures, and the meal prepared for Ibrahim's visitors. These paintings are used once each.
- The native illustration system is extended from the project's existing editable SVG artwork. This is a mixture of native illustrations and paintings; it is not 1,710 newly AI-painted raster images.

The original English/Urdu story text and existing voice/UI fixes are preserved.

## Verification and its limits

`report.json` contains the current results. All 1,710 images are actually rendered for the gallery; verification checks missing renders, identical artwork, and reused subject/set combinations. A 64-bit dHash screen also flags visually close pictures within a story for review. A hash comparison is not a semantic or universal percentage-similarity test.

The requested “less than 50% matching” is a visual design goal, not a certified numerical result. Repeated historical subjects and the shared illustration style can still be recognisable. The gallery is included so that every story's images can be reviewed together, rather than relying on filenames or code-only claims.

## Run the website

From the project folder:

```
npm install
npm start
```

To create a production build:

```
npm run build
```

## Regenerate the offline plan/review

```
node scripts/planStoryArtwork.cjs
node scripts/reviewStoryArtwork.cjs
```

The visual review script uses `sharp`, which was available in the development installation. If your install does not include it, install it as a development dependency before using this optional review script. It is not required to run the website.

The plan/review scripts do not contact a generation provider or transfer story text.
