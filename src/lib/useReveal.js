import { useEffect, useRef, useState } from 'react';

// Lightweight IntersectionObserver hook for scroll-reveal.
// Returns [ref, inView] — attach ref to the element you want to watch.
// Once in-view, disconnects immediately (animates once, same as vpOnce).
export function useReveal({ threshold = 0.05 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}
