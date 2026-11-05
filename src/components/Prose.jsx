import { Link } from "react-router-dom";
import { Check } from "@phosphor-icons/react";

/*
 * Lopende tekst uit de data-bestanden. Alinea's worden gescheiden door een
 * lege regel, regels die met "- " beginnen worden een lijst, regels die met
 * "|" beginnen een tabel (eerste rij = kop, tweede rij = scheiding), en **vet**
 * en [tekst](/pad) werken inline. Interne paden worden een router-link.
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

// Een vergelijkingstabel. Tabellen zijn voor AI-zoekmachines het makkelijkst
// te citeren. Op een telefoon past een tabel met drie kolommen niet, daar wordt
// het een lijst per criterium.
function Table({ lines, dark }) {
  const cells = (line) => line.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
  const [head, , ...rows] = lines.map(cells);
  const line = dark ? "border-white/20" : "border-line";
  const strong = dark ? "text-white" : "text-ink";
  return (
    <>
      {/* Telefoon: per criterium een blok met de opties eronder, zodat niets buiten beeld valt. */}
      <dl className={`divide-y overflow-hidden rounded-inner border sm:hidden ${line} ${dark ? "divide-white/20" : "divide-line"}`}>
        {rows.map((row) => (
          <div key={row[0]} className="px-4 py-3">
            <dt className={`font-semibold ${strong}`}>{inline(row[0], dark)}</dt>
            {row.slice(1).map((cell, j) => (
              <dd key={j} className="mt-1 text-[0.9375rem] leading-snug">
                <span className={`font-semibold ${strong}`}>{head[j + 1]}:</span> {inline(cell, dark)}
              </dd>
            ))}
          </div>
        ))}
      </dl>
      <div className={`hidden overflow-x-auto rounded-inner border sm:block ${line}`}>
        <table className="w-full border-collapse text-left text-[0.9375rem]">
          <thead className={dark ? "bg-white/10" : "bg-bone/60"}>
            <tr>
              {head.map((h) => (
                <th key={h} scope="col" className={`px-4 py-3 font-semibold ${strong}`}>
                  {inline(h, dark)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className={`border-t ${line}`}>
                {row.map((cell, j) =>
                  j === 0 ? (
                    <th key={j} scope="row" className={`px-4 py-3 font-semibold ${strong}`}>
                      {inline(cell, dark)}
                    </th>
                  ) : (
                    <td key={j} className="px-4 py-3">
                      {inline(cell, dark)}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
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
        if (lines.length > 2 && lines.every((l) => l.startsWith("|"))) {
          return <Table key={i} lines={lines} dark={dark} />;
        }
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
