import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Database,
  LockSimple,
} from "@phosphor-icons/react";
import { useLanguage } from "../i18n/LanguageContext";
import { sendIntent } from "../lib/intent";
import Heading from "./Heading";

/*
 * De diensten als bento: vier vlakken van ongelijke grootte, elk met een kleine
 * illustratie uit code die laat zien wat de dienst doet. Per vlak alleen een
 * titel, één zin, de doorlooptijd en een link: de details staan bij de prijzen.
 *
 * De illustraties spelen één keer af als de sectie in beeld komt. Zonder JS of
 * met reduced motion staan ze direct in hun eindstand: `data-phase` begint op
 * "static" en wordt alleen "armed" als de sectie nog onder de vouw ligt.
 */

function WebsiteArt({ demo }) {
  return (
    <div className="svc-art flex flex-col overflow-hidden rounded-inner bg-ground text-ink shadow-soft">
      <div className="flex items-center gap-2 border-b border-line bg-bone px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="ml-2 rounded-full bg-ground px-3 py-0.5 text-[0.6875rem] font-semibold text-ink-soft">
          {demo.url}
        </span>
      </div>
      <div className="grid h-[calc(100%-2.125rem)] grid-cols-[1.2fr_1fr] gap-4 p-4">
        <div className="flex flex-col justify-center gap-2">
          <span className="svc-pop h-3 w-[85%] rounded-full bg-ink" style={{ "--d": 0 }} />
          <span className="svc-pop h-3 w-[60%] rounded-full bg-ink" style={{ "--d": 1 }} />
          <span className="svc-pop mt-1 h-2 w-[90%] rounded-full bg-line" style={{ "--d": 2 }} />
          <span className="svc-pop h-2 w-[70%] rounded-full bg-line" style={{ "--d": 2 }} />
          <span
            className="svc-pop mt-2 inline-flex w-fit rounded-full bg-brand px-3 py-1 text-[0.6875rem] font-semibold text-white"
            style={{ "--d": 3 }}
          >
            {demo.cta}
          </span>
        </div>
        <div className="svc-pop relative overflow-hidden rounded-inner bg-bone" style={{ "--d": 2 }}>
          <span
            className="absolute inset-y-0 left-0 w-3/4 bg-brand"
            style={{ clipPath: "polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%)" }}
          />
        </div>
      </div>
    </div>
  );
}

const BARS = [42, 64, 50, 82, 58, 92, 70];

function WebappArt({ demo }) {
  return (
    <div className="svc-art flex overflow-hidden rounded-inner border border-line bg-ground">
      <div className="flex w-12 shrink-0 flex-col items-center gap-3 bg-bone py-4">
        <span className="h-5 w-5 rounded-[6px] bg-brand" />
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-5 rounded-full bg-line-strong" />
        ))}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-[0.75rem] font-semibold text-ink">{demo.appTitle}</span>
        <div className="mt-3 flex h-24 items-end gap-2 border-b border-line">
          {BARS.map((h, i) => (
            <span
              key={i}
              className={`svc-bar flex-1 rounded-t-[4px] ${i === 5 ? "bg-brand" : "bg-on-dark-soft"}`}
              style={{ height: `${h}%`, "--d": i }}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-1.5">
          <span className="h-2 w-[80%] rounded-full bg-line" />
          <span className="h-2 w-[55%] rounded-full bg-line" />
        </div>
      </div>
    </div>
  );
}

function MaintenanceArt({ demo }) {
  return (
    <ul className="svc-art flex flex-col justify-center gap-2 rounded-inner bg-bone p-4">
      {demo.log.map((row, i) => (
        <li
          key={row}
          className="svc-pop flex items-center gap-3 rounded-[10px] bg-ground px-3 py-2.5"
          style={{ "--d": i * 2 }}
        >
          <CheckCircle size={20} weight="fill" className="svc-tick shrink-0 text-brand" style={{ "--d": i * 2 + 1 }} />
          <span className="flex-1 text-[0.8125rem] font-semibold text-ink">{row}</span>
          <span className="text-[0.75rem] text-ink-soft">{demo.logMeta}</span>
        </li>
      ))}
    </ul>
  );
}

function HostingArt({ demo }) {
  return (
    <div className="svc-art flex flex-col justify-center gap-3 rounded-inner bg-bone p-4">
      <div className="flex items-center justify-between rounded-[10px] bg-ground px-4 py-3">
        <span className="text-[0.875rem] font-bold text-ink">{demo.url}</span>
        <span className="inline-flex items-center gap-2 rounded-full bg-brand px-3 py-1 text-[0.75rem] font-semibold text-white">
          <span className="svc-pulse h-2 w-2 rounded-full bg-white" />
          {demo.status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <span className="svc-pop flex items-center gap-2 rounded-[10px] bg-ground px-3 py-2.5 text-[0.8125rem] font-semibold text-ink" style={{ "--d": 1 }}>
          <LockSimple size={16} className="text-brand" />
          {demo.ssl}
        </span>
        <span className="svc-pop flex items-center gap-2 rounded-[10px] bg-ground px-3 py-2.5 text-[0.8125rem] font-semibold text-ink" style={{ "--d": 2 }}>
          <Database size={16} className="text-brand" />
          {demo.backup}
        </span>
      </div>
    </div>
  );
}

// Website is het hoofdvlak (indigo, breed); de rest wisselt breed/smal af.
const ITEMS = [
  { key: "website", Art: WebsiteArt, span: "lg:col-span-7", featured: true },
  { key: "webapp", Art: WebappArt, span: "lg:col-span-5" },
  { key: "maintenance", Art: MaintenanceArt, span: "lg:col-span-5" },
  { key: "hosting", Art: HostingArt, span: "lg:col-span-7" },
];

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;
  const gridRef = useRef(null);
  const [phase, setPhase] = useState("static");

  useEffect(() => {
    const el = gridRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) return;
    setPhase("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("play");
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="diensten" className="band band--arrow section">
      <div className="band__lanes" aria-hidden="true">
        <span className="band__lane band__lane--one" />
        <span className="band__lane band__lane--two" />
      </div>

      <div className="wrap relative">
        <div className="max-w-[54rem]">
          <Heading parts={s.heading} />
          <p className="lead mt-4">{s.subheading}</p>
        </div>

        <div ref={gridRef} data-phase={phase} className="svc-grid mt-12 grid gap-5 lg:grid-cols-12 lg:gap-6">
          {ITEMS.map(({ key, Art, span, featured }) => {
            const item = s.items[key];
            return (
              <article
                key={key}
                className={`flex flex-col gap-6 rounded-card p-[clamp(1.5rem,3vw,2.25rem)] ${span} ${
                  featured ? "bg-brand text-white" : "bg-ground shadow-soft"
                }`}
              >
                <div aria-hidden="true">
                  <Art demo={s.demo} />
                </div>

                <div className="flex flex-1 flex-col">
                  <h3 className="text-[clamp(1.5rem,1.25rem+0.8vw,1.875rem)] font-bold tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className={`mb-6 mt-2 ${featured ? "text-white/90" : "text-ink-soft"}`}>{item.desc}</p>

                  <div
                    className={`mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t pt-5 ${
                      featured ? "border-white/25" : "border-line"
                    }`}
                  >
                    <span className={`inline-flex items-center gap-2 text-[0.9375rem] ${featured ? "text-white/90" : "text-ink-soft"}`}>
                      <Clock size={18} aria-hidden="true" />
                      <span>
                        <span className="sr-only">{s.termLabel}: </span>
                        {item.term}
                      </span>
                    </span>
                    <a
                      href="#contact"
                      onClick={() => sendIntent(`${s.intentMessage}: ${item.title}.`)}
                      className={`inline-flex items-center gap-1.5 font-semibold underline decoration-1 underline-offset-[0.25em] hover:decoration-2 ${
                        featured ? "text-white" : "text-brand"
                      }`}
                    >
                      {s.ctaPrefix} {item.ctaNoun}
                      <ArrowRight size={16} weight="bold" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
