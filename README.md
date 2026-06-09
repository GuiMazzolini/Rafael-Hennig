# Rafael Hennig — Photography Portfolio

A Next.js portfolio site for Rafael Hennig — landing page, photo galleries, and films — powered by Cloudinary.

## Site structure

| Route | Content |
|-------|---------|
| `/` | Hero, 5 newest photos, About, Contact |
| `/photos` | Full analog & digital galleries |
| `/videos` | Film / cinematography work |

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
  lisbon/
    ...
digital/
  berlin/
    ...
about/
  portrait.jpg   ← optional, used in the About section
```

- **Home page** shows the 5 most recently uploaded photos from `analog/` and `digital/`.
- **Photo galleries** use subfolder names as titles (e.g. `new-york` → "New York").
- **Videos** are loaded from **Vimeo** (title and description come from Vimeo automatically).

## Vimeo setup

1. Create an app at [Vimeo Developer](https://developer.vimeo.com/apps) and generate a **Personal Access Token** with `public` and `private` video scopes.
2. Add `VIMEO_ACCESS_TOKEN` to `.env.local`.
3. By default, the site fetches videos from the authenticated account (`/me/videos`).
4. Optionally set `VIMEO_USER_ID` to pull from a specific user, or `VIMEO_ALBUM_ID` + `VIMEO_USER_ID` to pull from a showcase/album only.

Titles and descriptions are read from each video's Vimeo metadata.

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret |
| `VIMEO_ACCESS_TOKEN` | Yes | Vimeo personal access token |
| `VIMEO_USER_ID` | No | Vimeo user ID (defaults to token owner) |
| `VIMEO_ALBUM_ID` | No | Vimeo showcase/album ID to filter videos |
| `REVALIDATION_SECRET` | Recommended | Secret for `/api/revalidate` (webhook + manual refresh) |
| `NEXT_PUBLIC_SITE_URL` | No | Canonical site URL for Open Graph |
| `NEXT_PUBLIC_INSTAGRAM_URL` | No | Instagram profile URL |
| `NEXT_PUBLIC_LINKEDIN_URL` | No | LinkedIn profile URL |

## Instant gallery updates (Cloudinary webhook)

Gallery data is cached for 1 hour by default. To refresh immediately when photos change in Cloudinary:

1. Generate a random secret and add it to `.env.local` and Vercel:
   ```
   REVALIDATION_SECRET=your-random-secret-here
   ```

2. In the [Cloudinary Console](https://console.cloudinary.com/) go to **Settings → Webhook Notifications**.

3. Add a notification URL:
   ```
   https://your-domain.com/api/revalidate?secret=your-random-secret-here
   ```

4. Enable notifications for **upload**, **delete**, and **rename** events.

Cloudinary signs each request with `X-Cld-Signature` (verified against your API secret). The `secret` query param is an extra layer for manual testing:

```bash
curl -X POST "https://your-domain.com/api/revalidate?secret=your-random-secret-here"
```

## Scripts

```bash
npm run dev     # Start development server
npm run build   # Production build
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Deployment

Deploy to [Vercel](https://vercel.com) or any platform that supports Next.js. Set the environment variables in your deployment settings. Gallery data is cached for 1 hour (ISR), or refreshed instantly via the Cloudinary webhook (see above).
