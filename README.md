# Andrew Luswata — Portfolio

The personal portfolio of **Andrew Luswata**, software developer & creative technologist from Kampala, Uganda.

A dark, editorial "digital atelier" — big Syne display type, film grain, a chartreuse accent, and an interactive Three.js particle field in the hero. Built to feel like a gallery, engineered to work like a product.

## Highlights

- **Three.js hero** — a 4,200-particle fibonacci sphere with a custom GLSL shader, breathing displacement and cursor parallax (lazy-loaded, respects `prefers-reduced-motion`)
- **Editorial project list** — cursor-following image previews on desktop, stacked cards on mobile
- **Motion system** — framer-motion scroll reveals, magnetic buttons, full-screen animated menu, reading-progress bar and section spy
- **Capability grid** — engineering, AI & prompt engineering, project/team leadership, design & creative direction
- **The Playground (`/playground`)** — an interactive lab built by AI: particle typography you can retype, a generative flow field with attract/repel/burst modes, a GLSL liquid orb, and spring-physics kinetic type
- **The Vault** — a curated resources section for fellow devs: cheat sheets, legendary repos and everyday tools
- **Resilient by default** — the dev.to writing section hides itself when there are no posts; the contact form tries EmailJS → Telegram API → mailto fallback

## Stack

Next.js 14 (App Router) · React 18 · Tailwind CSS · framer-motion · three / @react-three/fiber · react-fast-marquee · EmailJS · Sass

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment (all optional)

Copy `.env.example` to `.env`:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` / `_TEMPLATE_ID` / `_PUBLIC_KEY` | Contact form delivery via [EmailJS](https://www.emailjs.com/) |
| `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` | Telegram notification for contact messages |
| `NEXT_PUBLIC_GTM` | Google Tag Manager ID |

Without any of these the site still works — the form falls back to opening the visitor's mail app.

### Content

All content lives in [`utils/data`](./utils/data): `personal-data.js`, `capabilities.js`, `projects-data.js`, `experience.js`, `educations.js`, `skills.js`. The writing section pulls articles (with cover images) from dev.to for `personalData.devUsername`.

## Build

```bash
npm run build && npm start
```
