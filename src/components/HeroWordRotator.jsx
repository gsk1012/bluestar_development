import { useEffect, useState } from "react";

const TYPE_MS = 90;
const DELETE_MS = 45;
const HOLD_MS = 1900;
const GAP_MS = 350;

/**
 * Het laatste woord van de herokop, getypt met een typemachine-effect: het
 * woord wordt letter voor letter getypt, blijft even staan, wordt gewist en
 * wordt vervangen door het volgende.
 *
 * Het woord is het laatste op de regel, dus de breedte mag meebewegen zonder
 * dat er iets verschuift. De cursor houdt de regelhoogte vast als het woord
 * leeg is. Schermlezers krijgen alleen het eerste woord.
 *
 * @param {string[]} words - in volgorde getypt; het eerste is het rustwoord.
 * @param {boolean} reduce - bij true staat het eerste woord er statisch.
 */
export default function HeroWordRotator({ words, reduce }) {
  const [i, setI] = useState(0);
  const [len, setLen] = useState(words[0].length);
  const [deleting, setDeleting] = useState(false);

  const animate = !reduce && words.length > 1;

  useEffect(() => {
    if (!animate) return;
    const word = words[i];
    let delay;
    let next;

    if (!deleting && len < word.length) {
      delay = TYPE_MS;
      next = () => setLen(len + 1);
    } else if (!deleting) {
      delay = HOLD_MS;
      next = () => setDeleting(true);
    } else if (len > 0) {
      delay = DELETE_MS;
      next = () => setLen(len - 1);
    } else {
      delay = GAP_MS;
      next = () => {
        setDeleting(false);
        setI((i + 1) % words.length);
      };
    }

    const id = setTimeout(next, delay);
    return () => clearTimeout(id);
  }, [animate, words, i, len, deleting]);

  if (!animate) return <span>{words[0]}</span>;

  return (
    <>
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden="true">
        {words[i].slice(0, len)}
        <span className="typewriter-caret" />
      </span>
    </>
  );
}
