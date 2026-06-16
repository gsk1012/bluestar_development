const navLinks = [
  { label: "Diensten", href: "#diensten" },
  { label: "Werk", href: "#portfolio" },
  { label: "Aanpak", href: "#aanpak" },
  { label: "Contact", href: "#contact" },
];

const EMAIL = "gsinghkaur1012@gmail.com";
const PHONES = [
  { label: "06 8647 7249", tel: "0686477249" },
  { label: "06 5335 6007", tel: "0653356007" },
];

export default function Footer() {
  return (
    <footer className="text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <img
                src="/logo-mark.webp"
                alt="BlueStar Development logo"
                className="h-10 w-10 object-contain"
              />
              <span className="flex flex-col leading-none">
                <span className="font-heading text-lg font-bold text-white">
                  BlueStar
                </span>
                <span className="text-xs uppercase tracking-wide text-white/60">
                  Development
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Snelle, vindbare websites en webshops op maat voor ondernemers.
            </p>
          </div>

          <nav aria-label="Footernavigatie">
            <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
              Navigatie
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-white/70 transition-colors duration-150 hover:text-accent-bright"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-heading text-sm font-bold uppercase tracking-wide text-white">
              Contact
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex min-h-[44px] items-center text-sm text-white/70 transition-colors duration-150 hover:text-accent-bright"
                >
                  {EMAIL}
                </a>
              </li>
              {PHONES.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={`tel:${phone.tel}`}
                    className="inline-flex min-h-[44px] items-center text-sm text-white/70 transition-colors duration-150 hover:text-accent-bright"
                  >
                    {phone.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-sm text-white/70">
            &copy; {new Date().getFullYear()} BlueStar Development. Alle rechten
            voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
