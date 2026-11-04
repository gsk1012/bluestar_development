import { Link } from "react-router-dom";
import { Check } from "@phosphor-icons/react";

/*
 * Lopende tekst uit de data-bestanden. Alinea's worden gescheiden door een
 * lege regel, regels die met "- " beginnen worden een lijst, en **vet** en
 * [tekst](/pad) werken inline. Interne paden worden een router-link.
 */

function inline(text, dark = false) {
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const bold = part.match(/^\*\*(.+)\*\*$/);
    if (bold) return <strong key={i} className={`font-semibold ${dark ? "text-white" : "text-ink"}`}>{bold[1]}</strong>;
    const link = part.match(/^\[(.+)\]\((.+)\)$/);
    if (link) {
      const [, label, href] = link;
      const cls = dark ? "text-link !text-white" : "text-link";
      if (href.startsWith("/")) return <Link key={i} to={href} className={cls}>{label}</Link>;
      const external = /^https?:/.test(href);
      return (
        <a key={i} href={href} className={cls} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
          {label}
        </a>
      );
    }
    return part;
  });
}

// Een inleidende zin direct boven een lijst ("Let op:\n- a\n- b") wordt een
// eigen alinea, zodat de lijst eronder als lijst wordt opgemaakt.
function blocks(body) {
  return body.split("\n\n").flatMap((block) => {
    const [first, ...rest] = block.split("\n");
    return rest.length && !first.startsWith("- ") && rest.every((l) => l.startsWith("- "))
      ? [first, rest.join("\n")]
      : [block];
  });
}

/**
 * @param {boolean} [dark] - witte tekst, voor op een indigo vlak
 * @param {boolean} [plain] - lijsten als rustige opsomming zonder vinkjes (juridische tekst)
 */
export default function Prose({ body, dark = false, plain = false }) {
  return (
    <div className={`space-y-4 text-[1.0625rem] leading-[1.7] ${dark ? "text-white/85" : "text-ink-soft"}`}>
      {blocks(body).map((block, i) => {
        const lines = block.split("\n");
        if (lines.every((l) => l.startsWith("- ")) && plain) {
          return (
            <ul key={i} className="flex flex-col gap-2 pl-1">
              {lines.map((l) => (
                <li key={l} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{inline(l.slice(2))}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul
              key={i}
              className={`divide-y overflow-hidden rounded-inner border ${
                dark ? "divide-white/20 border-white/25 bg-white/10" : "divide-line border-line bg-bone/50"
              }`}
            >
              {lines.map((l) => (
                <li key={l} className="flex items-start gap-3 px-4 py-3 sm:px-5">
                  <span
                    className={`mt-[0.3rem] flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      dark ? "bg-white text-brand" : "bg-brand text-white"
                    }`}
                  >
                    <Check size={11} weight="bold" aria-hidden="true" />
                  </span>
                  <span>{inline(l.slice(2), dark)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{inline(block, dark)}</p>;
      })}
    </div>
  );
}
