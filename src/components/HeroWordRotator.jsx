import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const HOLD_MS = 2800;
const ease = [0.16, 1, 0.3, 1];

// Far enough to clear the headline's clip box before the word becomes visible.
// The <h1> already wraps every line in `overflow-hidden`, so this component
// needs no clip box of its own — adding one would break baseline alignment,
// since an inline-block with clipped overflow takes its bottom edge as its
// baseline instead of the text's.
const OFFSET = "130%";

/**
 * The last word of the hero headline, swapped on a timer using the same clipped
 * slide-up the headline lines use on entry, so the page keeps one motion
 * vocabulary rather than introducing a second one.
 *
 * The word is the last thing on its line, so a swap is free to change the
 * element's width: nothing follows it to be pushed around.
 *
 * @param {string[]} words - rotated in order; the first is the resting word.
 * @param {boolean} reduce - when true, renders the first word and never swaps.
 */
export default function HeroWordRotator({ words, reduce }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce || words.length < 2) return;
    const id = setInterval(() => setI(n => (n + 1) % words.length), HOLD_MS);
    return () => clearInterval(id);
  }, [reduce, words.length]);

  if (reduce || words.length < 2) return <span>{words[0]}</span>;

  return (
    // `popLayout` pulls the outgoing word out of flow, so the element's width
    // tracks the incoming word instead of the widest one.
    <span className="relative inline-block">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: OFFSET }}
          animate={{ y: "0%" }}
          exit={{ y: `-${OFFSET}` }}
          transition={{ duration: 0.62, ease }}
          className="inline-block"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
