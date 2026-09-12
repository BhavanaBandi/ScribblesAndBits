"use client";

import { motion } from "framer-motion";
import Tape from "./Tape";
import styles from "./Letter.module.css";

export default function Letter({ children }) {
  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.paper}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className={styles.tapeCorner}>
          <Tape color="sky" rotate={-6} />
        </div>
        {children}
      </motion.div>
    </div>
  );
}
