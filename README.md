# Rafael Hennig — Photography Portfolio

A Next.js portfolio site for Rafael Hennig, featuring analog and digital photography galleries powered by Cloudinary.

## Requirements

- Node.js >= 20.9.0 (see `.nvmrc`)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template and fill in your Cloudinary credentials:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Cloudinary folder structure

Organize assets in Cloudinary with this folder layout:

```
analog/
  berlin/
    photo1.jpg
    photo2.jpg
  lisbon/
    ...
digital/
  berlin/
    ...
about/
  portrait.jpg   ← optional, used in the About section
```

Subfolder names become gallery titles (e.g. `new-york` → "New York").

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL for Open Graph |
| `NEXT_PUBLIC_INSTAGRAM_URL` | No | Instagram profile URL |
| `NEXT_PUBLIC_BEHANCE_URL` | No | Behance profile URL |
| `NEXT_PUBLIC_LINKEDIN_URL` | No | LinkedIn profile URL |

## Scripts

```bash
npm run dev     # Start development server
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Deployment

Deploy to [Vercel](https://vercel.com) or any platform that supports Next.js. Set the environment variables in your deployment settings. Gallery data is cached for 1 hour (ISR).
