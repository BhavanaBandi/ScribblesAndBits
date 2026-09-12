"use client";

import { useRef, useState } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import Doodle from "./Doodle";
import Stamp from "./Stamp";
import Tape from "./Tape";
import styles from "./Envelope.module.css";

const flapVariants = {
  idle: { rotateX: 0 },
  opened: {
    rotateX: -170,
    transition: { duration: 0.55, delay: 0.1, ease: "easeInOut" },
  },
};

const sealVariants = {
  idle: { scale: 1, opacity: 1, rotate: 0 },
  opened: {
    scale: [1, 1.25, 0],
    rotate: [0, 12, 28],
    opacity: [1, 1, 0],
    transition: { duration: 0.35, times: [0, 0.5, 1] },
  },
};

const letterVariants = {
  idle: { y: 0, opacity: 0, scale: 0.94 },
  opened: {
    y: "-58%",
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: 0.5, ease: "easeOut" },
  },
};

const frontTextVariants = {
  idle: { opacity: 1 },
  opened: { opacity: 0, transition: { duration: 0.25 } },
};

export default function Envelope({ name, onOpen }) {
  const [phase, setPhase] = useState("idle");
  const controls = useAnimation();
  const reducedMotion = useReducedMotion();
  const letterRef = useRef(null);

  function reportOpen() {
    onOpen(letterRef.current?.getBoundingClientRect() ?? null);
  }

  async function handleClick() {
    if (phase !== "idle") return;

    if (reducedMotion) {
      setPhase("opened");
      setTimeout(reportOpen, 200);
      return;
    }

    await controls.start({
      rotate: [0, -2.5, 2.5, -1.5, 1.5, 0],
      transition: { duration: 0.32 },
    });
    setPhase("opened");
  }

  return (
    <div className={styles.stage}>
      <motion.button
        type="button"
        className={styles.envelope}
        animate={controls}
        onClick={handleClick}
        disabled={phase !== "idle"}
      >
        <motion.div
          ref={letterRef}
          className={styles.letterPeek}
          variants={letterVariants}
          initial="idle"
          animate={phase}
          onAnimationComplete={(definition) => {
            if (definition === "opened") reportOpen();
          }}
        />

        <motion.div
          className={styles.flap}
          variants={flapVariants}
          initial="idle"
          animate={phase}
        />

        <motion.div
          className={styles.seal}
          variants={sealVariants}
          initial="idle"
          animate={phase}
        >
          <Doodle type="heart" color="var(--paper-soft)" size={16} />
        </motion.div>

        <div className={styles.stampWrap}>
          <Stamp doodle="flower" color="sky" rotate={7} />
        </div>
        <div className={styles.tapeTL}>
          <Tape color="mustard" rotate={-18} />
        </div>
        <div className={styles.tapeTR}>
          <Tape color="rose" rotate={12} />
        </div>

        <motion.div
          className={styles.frontText}
          variants={frontTextVariants}
          initial="idle"
          animate={phase}
        >
          <p className={styles.greeting}>Dearest {name},</p>
          <p className={styles.subtext}>
            there&apos;s something i&apos;ve been meaning to tell you...
          </p>
        </motion.div>
      </motion.button>

      <p className={styles.hint} aria-hidden="true">
        {phase === "idle" ? "( tap the envelope )" : ""}
      </p>
    </div>
  );
}
