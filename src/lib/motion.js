// Shared Motion variants used across all sections for consistent reveal animation.
export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
}

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

// Shared viewport options: trigger early, animate once.
export const vpOnce = { once: true, amount: 0.05 }
