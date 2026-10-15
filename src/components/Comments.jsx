"use client";

import { useEffect, useRef } from "react";
import Doodle from "./Doodle";
import styles from "./Comments.module.css";

// Comments are powered by giscus (https://giscus.app), which stores each
// thread as a GitHub Discussion on this repo instead of a database. It's
// just a <script> tag that renders an embedded iframe — nothing goes
// through a server of ours.
//
// Setup is done — Discussions is enabled, the giscus app is installed, and
// these ids come straight from the embed snippet giscus.app generated.
const GISCUS_REPO = "BhavanaBandi/ScribblesAndBits";
const GISCUS_REPO_ID = "R_kgDOUYE8NQ";
const GISCUS_CATEGORY = "General";
const GISCUS_CATEGORY_ID = "DIC_kwDOUYE8Nc4DIg4o";

export default function Comments() {
  const embedRef = useRef(null);

  useEffect(() => {
    const container = embedRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", GISCUS_REPO);
    script.setAttribute("data-repo-id", GISCUS_REPO_ID);
    script.setAttribute("data-category", GISCUS_CATEGORY);
    script.setAttribute("data-category-id", GISCUS_CATEGORY_ID);
    // Ties each newsletter's thread to its own URL, so every letter gets
    // its own comment section automatically.
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "en");

    container.appendChild(script);

    return () => {
      container.replaceChildren();
    };
  }, []);

  return (
    <section className={styles.wrap}>
      <p className={styles.heading}>leave a little note</p>
      <Doodle
        type="heart"
        size={20}
        color="var(--rose)"
        className={styles.underline}
      />
      <div ref={embedRef} className={styles.embed} />
    </section>
  );
}
