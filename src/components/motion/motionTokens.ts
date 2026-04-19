import type { Transition, Variants } from "framer-motion";

export const motionEase = [0.22, 1, 0.36, 1] as const;

export const motionViewport = {
  once: true,
  amount: 0.24,
} as const;

export const microTransition: Transition = {
  duration: 0.18,
  ease: motionEase,
};

export const revealTransition: Transition = {
  duration: 0.46,
  ease: motionEase,
};

export const sectionTransition: Transition = {
  duration: 0.62,
  ease: motionEase,
};

export function createRevealVariants(
  reducedMotion: boolean | null,
  distance = 28,
  scale = 0.985,
): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  }

  return {
    hidden: {
      opacity: 0,
      y: distance,
      scale,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };
}

export function createOffsetRevealVariants(
  reducedMotion: boolean | null,
  offset = 28,
): Variants {
  if (reducedMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
  }

  return {
    hidden: {
      opacity: 0,
      x: offset,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };
}

export function createStaggerContainer(
  reducedMotion: boolean | null,
  staggerChildren = 0.08,
  delayChildren = 0,
): Variants {
  return {
    hidden: {
      opacity: reducedMotion ? 1 : 0,
    },
    visible: {
      opacity: 1,
      transition: reducedMotion
        ? {
            duration: 0.01,
          }
        : {
            staggerChildren,
            delayChildren,
          },
    },
  };
}

export function getHoverLift(reducedMotion: boolean | null, y = -5, scale = 1.008) {
  if (reducedMotion) {
    return undefined;
  }

  return {
    y,
    scale,
    transition: microTransition,
  };
}

export function getTapPress(reducedMotion: boolean | null) {
  if (reducedMotion) {
    return undefined;
  }

  return {
    scale: 0.995,
    transition: microTransition,
  };
}

export function getLoopTransition(duration = 8, delay = 0): Transition {
  return {
    duration,
    delay,
    ease: "easeInOut",
    repeat: Number.POSITIVE_INFINITY,
    repeatType: "mirror",
  };
}
