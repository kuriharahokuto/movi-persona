# MOVI Persona

Your Life, Your Movie

MOVI Persona is an entertainment diagnosis app that lets users discover their movie protagonist type through cinematic scenario questions.

This service is for entertainment and self-reflection. It is not a medical, clinical, or psychological diagnosis.

## Features

- 16 movie protagonist archetypes
- Cinematic question flow
- Local scoring engine
- Result page with movie title, tagline, trailer-style report, compatibility, and share card
- No external API
- No AI API
- No authentication
- No database
- No personal information collection

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS

## Local Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run typecheck
npm run test
npm run build
```

## Vercel

- Framework Preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

## Privacy And Security

MOVI Persona runs as a frontend-only application. Diagnosis answers are processed in the browser and are not sent to an external server by this app.

Sharing to X uses a Web Intent URL only. The app does not use the X API, OAuth, API keys, external uploads, or automatic posting.

## Disclaimer

MOVI Persona is not affiliated with any movie studio, distributor, production company, actor, or rights holder. Results are fictional entertainment expressions and should not be used as professional advice.
