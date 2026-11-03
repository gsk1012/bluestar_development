import { ArrowRight, Browser, Clock, CloudCheck, Code, Wrench } from "@phosphor-icons/react";
import { useLanguage } from "../i18n/LanguageContext";
import { sendIntent } from "../lib/intent";
import Heading from "./Heading";

/*
 * De diensten als vier compacte kaarten: een klein icoon, de titel, één zin,
 * en onderaan de doorlooptijd met een link die het contactformulier alvast
 * invult. Bewust rustig: de details staan bij de prijzen.
 */
const ITEMS = [
  { key: "website", Icon: Browser },
  { key: "webapp", Icon: Code },
  { key: "maintenance", Icon: Wrench },
  { key: "hosting", Icon: CloudCheck },
];

export default function Services() {
  const { t } = useLanguage();
  const s = t.services;

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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {ITEMS.map(({ key, Icon }) => {
            const item = s.items[key];
            return (
              <article key={key} className="flex flex-col rounded-card bg-ground p-6 shadow-soft lg:p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-inner bg-brand text-white">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl">{item.title}</h3>
                <p className="mb-6 mt-2 text-[0.9375rem] text-ink-soft">{item.desc}</p>

                <div className="mt-auto border-t border-line pt-4">
                  <p className="inline-flex items-center gap-2 text-sm text-ink-soft">
                    <Clock size={16} aria-hidden="true" />
                    <span>
                      <span className="sr-only">{s.termLabel}: </span>
                      {item.term}
                    </span>
                  </p>
                  <a
                    href="#contact"
                    onClick={() => sendIntent(`${s.intentMessage}: ${item.title}.`)}
                    className="text-link mt-3 flex items-center gap-1.5 text-[0.9375rem]"
                  >
                    {s.ctaPrefix} {item.ctaNoun}
                    <ArrowRight size={15} weight="bold" aria-hidden="true" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
