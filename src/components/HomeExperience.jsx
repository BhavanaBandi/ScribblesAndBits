"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Envelope from "./Envelope";
import Tape from "./Tape";
import { useTransitionNav } from "./PageTransition";
import styles from "./HomeExperience.module.css";

export default function HomeExperience({ latestNewsletter }) {
  const [step, setStep] = useState("name");
  const [name, setName] = useState("");
  const inputId = useId();
  const { beginTransition } = useTransitionNav();

  function handleSubmit(event) {
    event.preventDefault();
    setStep("envelope");
  }

  function handleOpen(rect) {
    if (latestNewsletter) {
      beginTransition({ href: `/letter/${latestNewsletter.slug}`, rect });
    }
  }

  const displayName = name.trim() || "friend";

  return (
    <div className={styles.screen}>
      <AnimatePresence mode="wait">
        {step === "name" ? (
          <motion.div
            key="name"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className={styles.card}
          >
            <div className={styles.tape}>
              <Tape color="sky" rotate={-3} />
            </div>
            <p className={styles.greeting}>hello, beautiful</p>
            <p className={styles.copy}>
              this little corner of the internet is full of things
              i&apos;ve been thinking about.
              <br />
              type your name below ♡
            </p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.label} htmlFor={inputId}>
                your name
              </label>
              <input
                id={inputId}
                className={styles.input}
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="name"
                autoComplete="off"
                maxLength={40}
              />
              <button type="submit" className={styles.button}>
                open your letter →
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            {latestNewsletter ? (
              <Envelope name={displayName} onOpen={handleOpen} />
            ) : (
              <div className={styles.card}>
                <p className={styles.greeting}>Dearest {displayName},</p>
                <p className={styles.emptyNote}>
                  i&apos;m still writing this month&apos;s letter — come back
                  soon.
                </p>
                <Link href="/archive" className={styles.archiveLink}>
                  read the old ones instead →
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
