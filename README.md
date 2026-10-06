# Grammar Aura

**Grammar Aura** is an original, mobile-first English grammar adventure for learners worldwide. It guides players through the complete CEFR journey from **A1 to C2** using short interactive challenges, local progress, and a living academy of mentors.

## What is inside

- 78 grammar lessons covering A1, A2, B1, B2, C1, and C2.
- Four challenge types: multiple choice, word order, fill the gap, and error correction.
- Three in-game mentors with different roles:
  - **Nova — Grammar Guide:** explains rules and offers hints.
  - **Milo — Error Analyst:** helps identify the pattern behind mistakes.
  - **Aya — Quest Captain:** encourages streaks and higher-skill quests.
- Original background music with mute controls and responsive feedback sounds.
- Interface localization for English, Spanish, Turkish, French, German, Russian, Hausa, Swahili, Kinyarwanda, Japanese, Korean, Chinese, and Italian.
- Progress saved locally in the browser with `localStorage`; no account, backend, database, tracking, or API keys.
- Three.js visual layer with responsive HTML/CSS gameplay UI.

## Run locally

```bash
pnpm install
pnpm dev
```

Open the local URL shown by Vite. For a production check:

```bash
pnpm typecheck
pnpm build
pnpm test
```

## GitHub Pages

The repository includes a GitHub Actions workflow that builds the Vite application and publishes `dist/` to GitHub Pages. The app uses a relative Vite base path so it works at the repository URL.

## Privacy

Grammar Aura does not require sign-in and does not send learning progress to a server. Progress and settings remain in the current browser only.

## Credits

Built as an original educational game concept for OMDApay. The project uses Three.js and the bundled Manus CC0 fonts. The background soundtrack is an original generated asset made for this game.
