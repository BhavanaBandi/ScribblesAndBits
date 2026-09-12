import Link from "next/link";
import { notFound } from "next/navigation";
import Letter from "@/components/Letter";
import Newsletter from "@/components/Newsletter";
import { getAllSlugs, getNewsletterBySlug } from "@/lib/newsletters";
import styles from "./page.module.css";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const newsletter = await getNewsletterBySlug(slug);
  if (!newsletter) return {};

  return {
    title: `${newsletter.title} — Scribbles & Bits`,
  };
}

export default async function LetterPage({ params }) {
  const { slug } = await params;
  const newsletter = await getNewsletterBySlug(slug);

  if (!newsletter) notFound();

  return (
    <>
      <nav className={styles.topbar}>
        <Link href="/archive">view my other bits →</Link>
      </nav>
      <Letter>
        <Newsletter newsletter={newsletter} />
      </Letter>
    </>
  );
}
