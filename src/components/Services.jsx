import { Link } from "react-router-dom";
import { ArrowRight, Browser, Clock, CloudCheck, Code, Wrench } from "@phosphor-icons/react";
import { useLanguage } from "../i18n/LanguageContext";
import Heading from "./Heading";

/*
 * De diensten als vier compacte kaarten: een klein icoon, de titel, één zin,
 * en onderaan de doorlooptijd. Elke kaart linkt naar de eigen dienstpagina,
 * waar de details staan.
 */
const ITEMS = [
  { key: "website", Icon: Browser, href: "/website-laten-maken" },
  { key: "webapp", Icon: Code, href: "/webapplicatie-laten-maken" },
  { key: "maintenance", Icon: Wrench, href: "/website-onderhoud" },
  { key: "hosting", Icon: CloudCheck, href: "/website-onderhoud#hosting" },
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
          {ITEMS.map(({ key, Icon, href }) => {
            const item = s.items[key];
            return (
              <article
                key={key}
                className="group relative flex flex-col rounded-card bg-ground p-6 shadow-soft transition-transform duration-300 ease-out hover:-translate-y-1 lg:p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-inner bg-brand text-white">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl">
                  {/* De hele kaart is klikbaar; de titel is de linktekst. */}
                  <Link
                    to={href}
                    className="transition-colors duration-150 after:absolute after:inset-0 group-hover:text-brand"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="mb-6 mt-2 text-[0.9375rem] text-ink-soft">{item.desc}</p>

                <div className="mt-auto border-t border-line pt-4">
                  <p className="inline-flex items-center gap-2 text-sm text-ink-soft">
                    <Clock size={16} aria-hidden="true" />
                    <span>
                      <span className="sr-only">{s.termLabel}: </span>
                      {item.term}
                    </span>
                  </p>
                  <span className="mt-3 flex items-center gap-1.5 text-[0.9375rem] font-semibold text-brand">
                    {s.readMore}
                    <ArrowRight
                      size={15}
                      weight="bold"
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
