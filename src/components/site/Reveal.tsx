"use client";

import React from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
}

export default function Reveal({
  children,
  width = "100%",
  delay = 0,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}
