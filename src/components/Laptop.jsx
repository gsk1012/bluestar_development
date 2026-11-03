/**
 * Een MacBook uit code (geen mockup-afbeelding): deksel met zwarte rand en
 * notch, het scherm met een screenshot, en een aluminium onderkant met de
 * duimuitsparing. Bij hover scrolt het scherm traag door de hele pagina.
 *
 * @param {string} src - de bovenkant van de pagina (statisch beeld)
 * @param {string} fullSrc - de volledige pagina, voor het scrollen bij hover
 */
export default function Laptop({ src, fullSrc, alt }) {
  return (
    <div className="laptop group">
      <div className="laptop__lid">
        <div className="laptop__screen">
          <img src={src} alt={alt} width="1280" height="900" loading="lazy" decoding="async" className="laptop__shot" />
          {fullSrc && (
            <img src={fullSrc} alt="" aria-hidden="true" loading="lazy" decoding="async" className="laptop__scroll" />
          )}
          <span className="laptop__notch" aria-hidden="true" />
        </div>
      </div>
      <div className="laptop__base" aria-hidden="true">
        <span className="laptop__thumb" />
      </div>
    </div>
  );
}
