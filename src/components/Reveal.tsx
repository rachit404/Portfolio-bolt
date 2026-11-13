import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
  delay?: number;
};

export function Reveal({ children, className, stagger = false, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      variants={stagger ? staggerContainer : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
