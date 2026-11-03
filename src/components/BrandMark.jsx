import { Link } from "react-router-dom";

/**
 * Het merk: de B met de ster uit het logo, met de naam als tekst ernaast zodat
 * de naam scherp en doorzoekbaar blijft. `inverse` zet het logo op een wit
 * vlak en de tekst wit, voor het indigo volschermmenu.
 */
export default function BrandMark({ onClick, ariaLabel, inverse = false }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      className={`brand${inverse ? " brand--inverse" : ""}`}
      aria-label={ariaLabel}
    >
      <span className="brand__icon" aria-hidden="true">
        <img src="/logo-mark-tight.webp" alt="" width="474" height="345" decoding="async" />
      </span>
      <span className="brand__text" aria-hidden="true">
        <span className="brand__name">BlueStar</span>
        <span className="brand__sub">Development</span>
      </span>
    </Link>
  );
}
