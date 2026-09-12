import { Caveat, Lora, Inter } from "next/font/google";
import ScrapbookBackground from "@/components/ScrapbookBackground";
import PageTransition from "@/components/PageTransition";
import "./globals.css";
import styles from "./layout.module.css";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-serif-base",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans-base",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Scribbles & Bits",
  description: "A little envelope addressed to you, from Bhavana's journal.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${lora.variable} ${inter.variable}`}
    >
      <body>
        <div className={styles.shell}>
          <ScrapbookBackground />
          <p className={styles.cornerNav}>my little corner ♡</p>
          <main className={styles.main}>
            <PageTransition>{children}</PageTransition>
          </main>
          <p className={styles.footer}>
            made with love &amp; questionable amounts of caffeine
          </p>
        </div>
      </body>
    </html>
  );
}
