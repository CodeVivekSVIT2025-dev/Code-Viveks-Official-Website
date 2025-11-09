"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

import { cn } from "@/lib/utils";

interface CometCardProps {
  rotateDepth?: number;
  translateDepth?: number;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const CometCard = ({
  rotateDepth = 18,
  translateDepth = 24,
  className,
  children,
  onClick,
  onMouseEnter: externalOnMouseEnter,
  onMouseLeave: externalOnMouseLeave,
}: CometCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 120, damping: 12 });
  const springY = useSpring(y, { stiffness: 120, damping: 12 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [`-${rotateDepth}deg`, `${rotateDepth}deg`]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [`${rotateDepth}deg`, `-${rotateDepth}deg`]);

  const translateX = useTransform(springX, [-0.5, 0.5], [`-${translateDepth}px`, `${translateDepth}px`]);
  const translateY = useTransform(springY, [-0.5, 0.5], [`${translateDepth}px`, `-${translateDepth}px`]);

  const glareX = useTransform(springX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 100]);

  const glare = useMotionTemplate`
    radial-gradient(circle at ${glareX}% ${glareY}%, 
      rgba(255,255,255,0.65) 0%, 
      rgba(255,255,255,0.2) 40%, 
      rgba(255,255,255,0) 80%)
  `;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const xPos = e.clientX - left;
    const yPos = e.clientY - top;

    x.set(xPos / width - 0.5);
    y.set(yPos / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    externalOnMouseLeave?.();
  };
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    externalOnMouseEnter?.();
  };

  return (
    <div className="perspective-distant transform-3d" onClick={onClick}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          boxShadow:
            "0px 25px 55px rgba(0,0,0,0.45), 0px 10px 18px rgba(0,0,0,0.25)",
        }}
        whileHover={{ scale: 1.05, z: 40, transition: { duration: 0.2 } }}
        className={cn(
          "relative rounded-2xl transition-all duration-200 backdrop-blur-sm select-none",
          className
        )}
      >
        {children}

        {/* Light glare layer */}
        <motion.div
          style={{
            background: glare,
            opacity: 0.7,
          }}
          className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-soft-light"
        />
      </motion.div>
    </div>
  );
};
