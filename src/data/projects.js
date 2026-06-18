// Portfolio-projecten met echte screenshots in /public/work/.
// scrollImage = volledige paginafoto (~530×2500 px WebP).
// Maak via Chrome DevTools → drie puntjes → "Capture full size screenshot".
// Zonder scrollImage valt de kaart terug op statische thumbnail.
export const projects = [
  {
    title: "Prince Schilder",
    description: "Professionele bedrijfswebsite voor een schildersbedrijf in Amsterdam.",
    url: "https://prince-schilder.vercel.app/",
    image: "/work/prince-schilder.webp",
    scrollImage: "/work/prince-schilder-full.webp",
    highlights: [
      "Mobiel-first ontwerp",
      "Offerte-aanvraagformulier",
      "Diensten- en werkenoverzicht",
      "Geanimeerde stats & testimonial",
    ],
  },
  {
    title: "GSK Portfolio",
    description: "Strakke, moderne portfolio-website om werk en vaardigheden te presenteren.",
    url: "https://gurpreetsingh-gsk.vercel.app/",
    image: "/work/gsk-portfolio.webp",
    scrollImage: "/work/gsk-portfolio-full.webp",
    highlights: [
      "Donker futuristisch thema",
      "Live GitHub-activiteit",
      "Soepele scroll-animaties",
      "Responsief op alle schermformaten",
    ],
  },
];
