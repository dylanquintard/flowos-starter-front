export const DEFAULT_TOUR_CITIES = [];

const SPECIAL_CITY_PATHS = {};
export const BLOCKED_LOCAL_CITY_SLUGS = Object.freeze([]);

export const FIXED_LOCAL_CITY_SLUGS = Object.freeze(Object.keys(SPECIAL_CITY_PATHS));

export function slugifyCity(city) {
  return String(city || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getFixedCityPathBySlug(citySlug) {
  return SPECIAL_CITY_PATHS[slugifyCity(citySlug)] || "";
}

export function getCityPath(city) {
  const slug = slugifyCity(city);
  if (!slug) return "";
  if (BLOCKED_LOCAL_CITY_SLUGS.includes(slug)) return "";
  return SPECIAL_CITY_PATHS[slug] || `/pizza-${slug}`;
}

export const SEO_KEYWORDS_SENTENCES = [
  "site vitrine local",
  "commande locale en ligne",
  "menu personnalisable",
  "horaires et disponibilites",
  "contenu de marque",
];

export const LOCAL_PAGE_CONTENT = {
  moselle: {
    pathname: "/camion-pizza-moselle",
    title: "Zone locale demonstration | Flow-OS Starter",
    description:
      "Page locale de demonstration. Personnalisez ou retirez ce bloc local selon le projet final.",
    h1: "Zone locale demonstration",
    intro:
      "Cette page locale est conservee pour compatibilite. Adaptez-la a votre vrai territoire ou desactivez ce module SEO si vous n en avez pas besoin.",
    sections: [
      {
        heading: "Un module local encore a ajuster",
        paragraphs: [
          "Le starter conserve les composants necessaires pour le SEO local, mais leur contenu doit etre reecrit selon le tenant reel.",
          "Avant publication, revoyez les noms de zones, les promesses de service et les contenus lies a l activite.",
        ],
      },
    ],
  },
  thionville: {
    pathname: "/pizza-thionville",
    title: "Zone locale demonstration | Flow-OS Starter",
    description:
      "Page locale de demonstration. Personnalisez ou retirez ce bloc local selon le projet final.",
    h1: "Zone locale demonstration",
    intro:
      "Cette page locale est conservee pour compatibilite. Adaptez-la a votre vrai territoire ou desactivez ce module SEO si vous n en avez pas besoin.",
    sections: [
      {
        heading: "Un module local encore a ajuster",
        paragraphs: [
          "Le starter conserve les composants necessaires pour le SEO local, mais leur contenu doit etre reecrit selon le tenant reel.",
          "Avant publication, revoyez les noms de zones, les promesses de service et les contenus lies a l activite.",
        ],
      },
    ],
  },
};

export function buildDynamicLocalPageContent(cityValue) {
  const city = String(cityValue || "").trim();
  if (!city) return null;

  return {
    pathname: `/pizza-${slugifyCity(city)}`,
    title: `Zone locale ${city} | Flow-OS Starter`,
    description:
      `Page locale de demonstration pour ${city}. Personnalisez ou desactivez cette strategie SEO selon le projet final.`,
    h1: `Zone locale ${city}`,
    intro:
      `Cette page locale est fournie comme base technique. Adaptez son contenu a votre activite ou desactivez-la si vous ne souhaitez pas de SEO local dedie.`,
    sections: [
      {
        heading: `Une base locale a adapter pour ${city}`,
        paragraphs: [
          "Le starter conserve les composants necessaires pour publier des pages locales, mais sans imposer un discours client ou geographique trop specifique.",
          "Avant mise en ligne, revoyez le contenu, la promesse et les zones de service selon le tenant cible.",
        ],
      },
    ],
    faq: [],
    footer:
      "Pour une version finalisee, adaptez les contenus locaux ou retirez ce module selon votre besoin.",
  };
}

export function buildDynamicCityContent(cityValue) {
  return buildDynamicLocalPageContent(cityValue);
}
