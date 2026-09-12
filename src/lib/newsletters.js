import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const NEWSLETTERS_DIR = path.join(process.cwd(), "newsletters");

const MONTH_INDEX = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

function listMarkdownFiles() {
  if (!fs.existsSync(NEWSLETTERS_DIR)) return [];
  return fs
    .readdirSync(NEWSLETTERS_DIR)
    .filter((file) => file.endsWith(".md"));
}

function readFrontmatter(filename) {
  const slug = filename.replace(/\.md$/, "");
  const fullPath = path.join(NEWSLETTERS_DIR, filename);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const month = String(data.month ?? "").trim();
  const year = Number(data.year);
  const monthOrder = MONTH_INDEX[month.toLowerCase()] ?? 0;

  return {
    slug,
    title: data.title ?? slug,
    month,
    year,
    note: data.note ?? null,
    sortKey: year * 100 + monthOrder,
    content,
  };
}

// A small deterministic hash so archive envelopes get a stable "scattered"
// rotation/offset per slug instead of shifting on every render.
export function hashSlug(slug) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getAllNewsletters() {
  return listMarkdownFiles()
    .map(readFrontmatter)
    .sort((a, b) => b.sortKey - a.sortKey)
    .map(({ content, sortKey, ...meta }) => meta);
}

export function getLatestNewsletter() {
  const all = getAllNewsletters();
  return all[0] ?? null;
}

export async function getNewsletterBySlug(slug) {
  const filename = `${slug}.md`;
  if (!listMarkdownFiles().includes(filename)) return null;

  const { content, sortKey, ...meta } = readFrontmatter(filename);
  const processed = await remark().use(remarkHtml).process(content);

  return {
    ...meta,
    contentHtml: processed.toString(),
  };
}

export function getAllSlugs() {
  return listMarkdownFiles().map((file) => file.replace(/\.md$/, ""));
}
