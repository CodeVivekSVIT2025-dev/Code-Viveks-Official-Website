"use client";
import { motion } from "framer-motion";
import { ReactNode, useMemo } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const direction = useMemo(() => (Math.random() > 0.5 ? 1 : -1), []);

  return (
    <>
      {/* Sliding Overlay */}
      <motion.div
        key="overlay"
        className="fixed inset-0 z-[999] pointer-events-none"
        initial={{ x: `${100 * direction}%` }}
        animate={{ x: `${-100 * direction}%` }}
        exit={{ x: `${-100 * direction}%` }}
        transition={{
          duration: 1.0, // ⚡ faster
          ease: [0.83, 0, 0.17, 1],
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transition-purple via-transition-blue to-transition-pink" />
        <motion.div
          className="absolute inset-0 bg-white/20 backdrop-blur-[6px] mix-blend-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.4 }} // ⚡ faster blur overlay
        />
      </motion.div>

      {/* Blurred Page Content During Transition */}
      <motion.div
        key="content-blur"
        initial={{ filter: "blur(14px)" }}
        animate={{ filter: "blur(0px)" }}
        exit={{ filter: "blur(14px)" }}
        transition={{
          duration: 0.6, // ⚡ synced faster
          ease: [0.83, 0, 0.17, 1],
        }}
        className="min-h-screen"
      >
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          transition={{ duration: 0.35 }} // ⚡ quicker fade
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
};

export default PageTransition;
