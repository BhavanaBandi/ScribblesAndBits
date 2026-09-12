# Scribbles & Bits

A personal, junk-journal-style newsletter site. Visitors type their name, open a
personalised envelope, and read the current letter — then can browse past
editions in the archive. Read-only for everyone but you: publishing a new
letter is just adding a Markdown file.

## Running it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). Leave that terminal
running while you're using the site; `Ctrl+C` stops it.

## Publishing a new letter

1. Write the letter.
2. Save it as `newsletters/YYYY-MM-monthname.md`, e.g. `newsletters/2026-10-october.md`.
3. Add frontmatter at the top:

   ```md
   ---
   title: "Your Title Here"
   month: "October"
   year: 2026
   note: "a little life update"
   ---

   Dear beautiful people,

   ...
   ```

   `title`, `month`, and `year` are required. `note` is optional — a short
   handwritten-style caption shown under the letter's envelope in the archive.
4. Commit and push. The newest letter (by year + month) automatically becomes
   the one the envelope opens to; older ones move into `/archive`.

No component code needs to change to add, remove, or reorder letters.

## Project structure

```
newsletters/              your letters, one .md file per month
src/
  app/
    page.js               landing page (name entry -> envelope)
    letter/[slug]/page.js  reading page for one newsletter
    archive/page.js        scattered-envelopes archive of past letters
    layout.js              fonts, background, corner nav, footer
  components/              Envelope, Letter, Newsletter, Archive, and the
                            decorative doodle/tape/stamp/background pieces
  lib/newsletters.js       reads and parses the Markdown files
```

## Stack

Next.js (App Router) · Framer Motion for the envelope-opening and
page-transition animations · CSS Modules · Markdown (`gray-matter` +
`remark`) for content. No database — everything is static files.

## Deploying

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). No
environment variables or extra configuration needed; every push to `main`
redeploys automatically, including new letters.
