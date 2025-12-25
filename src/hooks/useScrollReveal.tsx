import { useEffect, useRef } from 'react';
import { useInView, useScroll, useTransform, MotionValue } from 'framer-motion';

interface UseScrollRevealOptions {
  threshold?: number;
  once?: boolean;
  margin?: string;
}

export const useScrollReveal = (options: UseScrollRevealOptions = {}) => {
  const ref = useRef<HTMLElement>(null);
  const { threshold = 0.1, once = true, margin = '-100px' } = options;
  const isInView = useInView(ref, { once, margin, amount: threshold });

  return { ref, isInView };
};

export const useParallax = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`]);

  return { ref, y };
};

export const useScrollOpacity = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return { ref, opacity };
};

export const useScrollScale = (range: [number, number] = [0.8, 1]) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], range);

  return { ref, scale };
};

export const useScrollBlur = (maxBlur: number = 20) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const blur = useTransform(scrollYProgress, [0, 1], [maxBlur, 0]);

  return { ref, blur };
};

export const useScrollRotation = (maxRotation: number = 15) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [-maxRotation, maxRotation]);

  return { ref, rotate };
};


