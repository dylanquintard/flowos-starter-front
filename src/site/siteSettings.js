import {
  sanitizeAbsoluteHttpUrl,
  sanitizeInternalOrAbsoluteHttpUrl,
  sanitizeMediaUrl,
} from "../utils/url";

export const DEFAULT_SITE_SETTINGS = Object.freeze({
  siteName: "Flow-OS Starter",
  siteTagline: {
    fr: "Site vitrine et commandes locales a personnaliser",
    en: "Showcase website and local ordering to personalize",
  },
  siteDescription: {
    fr: "Starter Flow-OS pour restaurant, food truck ou concept local. Personnalisez le contenu, les horaires et le menu selon votre activite.",
    en: "Flow-OS starter for restaurants, food trucks or local concepts. Customize content, opening hours and menu to match your business.",
  },
  contact: {
    phone: "",
    email: "",
    address: "",
    mapsUrl: "",
    serviceArea: {
      fr: "Zone de service a personnaliser",
      en: "Service area to customize",
    },
  },
  social: {
    instagramUrl: "",
    facebookUrl: "",
    tiktokUrl: "",
  },
  seo: {
    defaultMetaTitle: {
      fr: "Flow-OS Starter | Site vitrine et commandes locales",
      en: "Flow-OS Starter | Showcase website and local ordering",
    },
    defaultMetaDescription: {
      fr: "Starter Flow-OS pour restaurant, food truck ou concept local. Personnalisez le contenu, les horaires et le menu selon votre activite.",
      en: "Flow-OS starter for restaurants, food trucks or local concepts. Customize content, opening hours and menu to match your business.",
    },
    defaultOgImageUrl: "",
    headerLogoUrl: "",
    faviconUrl: "",
    canonicalSiteUrl: "",
  },
  home: {
    heroTitle: {
      fr: "Un site Flow-OS pret a personnaliser",
      en: "A Flow-OS site ready to customize",
    },
    heroSubtitle: {
      fr: "Partez d une base propre pour votre restaurant, food truck ou commerce local, puis adaptez le contenu a votre activite.",
      en: "Start from a clean base for your restaurant, food truck or local business, then tailor the content to your activity.",
    },
    primaryCtaLabel: {
      fr: "Commander",
      en: "Order now",
    },
    secondaryCtaLabel: {
      fr: "Voir le menu",
      en: "See menu",
    },
    reassuranceText: {
      fr: "Contenu editable, menu personnalisable, deploiement rapide",
      en: "Editable content, customizable menu, fast deployment",
    },
    highlightedIngredients: {
      fr: [
        "specialites maison",
        "ingredients signatures",
        "produits de saison",
        "recettes personnalisees",
        "zones de retrait",
        "horaires adaptes",
      ].join("\n"),
      en: [
        "signature specialties",
        "house ingredients",
        "seasonal products",
        "custom recipes",
        "pickup areas",
        "tailored opening hours",
      ].join("\n"),
    },
  },
  blog: {
    introTitle: {
      fr: "Actualites, coulisses et savoir-faire",
      en: "News, behind the scenes and know-how",
    },
    introText: {
      fr: "Utilisez cette section pour partager votre univers, vos nouveautes et votre facon de travailler.",
      en: "Use this section to share your world, your updates and the way you work.",
    },
  },
  contactPage: {
    pageTitle: {
      fr: "Nous contacter",
      en: "Get in touch",
    },
    introText: {
      fr: "Pour toute question sur votre activite, vos horaires ou vos modalites de commande, adaptez ce bloc a votre fonctionnement.",
      en: "For any question about your activity, opening hours or ordering terms, tailor this block to your own workflow.",
    },
    helperText: {
      fr: "Retrouvez ici vos coordonnees, vos reseaux et votre formulaire de contact.",
      en: "Find your contact details, social links and contact form here.",
    },
  },
  order: {
    pickupIntroText: {
      fr: "Choisissez d abord la date, l horaire puis le lieu ou le mode de recuperation.",
      en: "Choose the date first, then the pickup time and the pickup method or location.",
    },
    pickupConfirmationText: {
      fr: "Verifiez bien les informations de recuperation avant de finaliser la commande.",
      en: "Please verify the pickup details before finalizing the order.",
    },
    showMenuProductImages: true,
  },
  footer: {
    shortText: {
      fr: "Starter Flow-OS a personnaliser pour votre activite locale.",
      en: "Flow-OS starter to customize for your local business.",
    },
    legalText: {
      fr: "Les informations affichees doivent etre adaptees a votre activite, vos horaires et vos zones de service.",
      en: "Displayed information should be tailored to your business, opening hours and service areas.",
    },
    copyright: {
      fr: "Tous droits reserves.",
      en: "All rights reserved.",
    },
  },
  announcement: {
    enabled: false,
    text: {
      fr: "",
      en: "",
    },
    linkUrl: "",
    variant: "info",
  },
  pizzaPage: {
    sectionTitle: {
      fr: "Nos produits a la une",
      en: "Our featured products",
    },
    sectionDescription: {
      fr: "Une selection mise en avant par l equipe. Personnalisez cette section selon votre carte et vos priorites commerciales.",
      en: "A selection highlighted by the team. Customize this section to match your menu and commercial priorities.",
    },
    featuredProductIds: [],
  },
  createdAt: null,
  updatedAt: null,
});

function cloneDefaults() {
  return JSON.parse(JSON.stringify(DEFAULT_SITE_SETTINGS));
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeLocalizedValue(defaultValue, nextValue) {
  const source = isPlainObject(nextValue) ? nextValue : {};
  return {
    fr:
      typeof source.fr === "string"
        ? source.fr
        : typeof defaultValue?.fr === "string"
          ? defaultValue.fr
          : "",
    en:
      typeof source.en === "string"
        ? source.en
        : typeof defaultValue?.en === "string"
          ? defaultValue.en
          : "",
  };
}

export function mergeSiteSettings(nextValue) {
  const defaults = cloneDefaults();
  const source = isPlainObject(nextValue) ? nextValue : {};

  return {
    siteName:
      typeof source.siteName === "string" && source.siteName.trim()
        ? source.siteName.trim()
        : defaults.siteName,
    siteTagline: mergeLocalizedValue(defaults.siteTagline, source.siteTagline),
    siteDescription: mergeLocalizedValue(defaults.siteDescription, source.siteDescription),
    contact: {
      phone:
        typeof source.contact?.phone === "string"
          ? source.contact.phone.trim()
          : defaults.contact.phone,
      email:
        typeof source.contact?.email === "string"
          ? source.contact.email.trim()
          : defaults.contact.email,
      address:
        typeof source.contact?.address === "string"
          ? source.contact.address.trim()
          : defaults.contact.address,
      mapsUrl:
        typeof source.contact?.mapsUrl === "string"
          ? sanitizeAbsoluteHttpUrl(source.contact.mapsUrl)
          : defaults.contact.mapsUrl,
      serviceArea: mergeLocalizedValue(
        defaults.contact.serviceArea,
        source.contact?.serviceArea
      ),
    },
    social: {
      instagramUrl:
        typeof source.social?.instagramUrl === "string"
          ? sanitizeAbsoluteHttpUrl(source.social.instagramUrl)
          : defaults.social.instagramUrl,
      facebookUrl:
        typeof source.social?.facebookUrl === "string"
          ? sanitizeAbsoluteHttpUrl(source.social.facebookUrl)
          : defaults.social.facebookUrl,
      tiktokUrl:
        typeof source.social?.tiktokUrl === "string"
          ? sanitizeAbsoluteHttpUrl(source.social.tiktokUrl)
          : defaults.social.tiktokUrl,
    },
    seo: {
      defaultMetaTitle: mergeLocalizedValue(
        defaults.seo.defaultMetaTitle,
        source.seo?.defaultMetaTitle
      ),
      defaultMetaDescription: mergeLocalizedValue(
        defaults.seo.defaultMetaDescription,
        source.seo?.defaultMetaDescription
      ),
      defaultOgImageUrl:
        typeof source.seo?.defaultOgImageUrl === "string"
          ? sanitizeMediaUrl(source.seo.defaultOgImageUrl)
          : defaults.seo.defaultOgImageUrl,
      headerLogoUrl:
        typeof source.seo?.headerLogoUrl === "string"
          ? sanitizeMediaUrl(source.seo.headerLogoUrl)
          : defaults.seo.headerLogoUrl,
      faviconUrl:
        typeof source.seo?.faviconUrl === "string"
          ? sanitizeMediaUrl(source.seo.faviconUrl)
          : defaults.seo.faviconUrl,
      canonicalSiteUrl:
        typeof source.seo?.canonicalSiteUrl === "string"
          ? sanitizeAbsoluteHttpUrl(source.seo.canonicalSiteUrl)
          : defaults.seo.canonicalSiteUrl,
    },
    home: {
      heroTitle: mergeLocalizedValue(defaults.home.heroTitle, source.home?.heroTitle),
      heroSubtitle: mergeLocalizedValue(defaults.home.heroSubtitle, source.home?.heroSubtitle),
      primaryCtaLabel: mergeLocalizedValue(
        defaults.home.primaryCtaLabel,
        source.home?.primaryCtaLabel
      ),
      secondaryCtaLabel: mergeLocalizedValue(
        defaults.home.secondaryCtaLabel,
        source.home?.secondaryCtaLabel
      ),
      reassuranceText: mergeLocalizedValue(
        defaults.home.reassuranceText,
        source.home?.reassuranceText
      ),
      highlightedIngredients: mergeLocalizedValue(
        defaults.home.highlightedIngredients,
        source.home?.highlightedIngredients
      ),
    },
    blog: {
      introTitle: mergeLocalizedValue(defaults.blog.introTitle, source.blog?.introTitle),
      introText: mergeLocalizedValue(defaults.blog.introText, source.blog?.introText),
    },
    contactPage: {
      pageTitle: mergeLocalizedValue(
        defaults.contactPage.pageTitle,
        source.contactPage?.pageTitle
      ),
      introText: mergeLocalizedValue(
        defaults.contactPage.introText,
        source.contactPage?.introText
      ),
      helperText: mergeLocalizedValue(
        defaults.contactPage.helperText,
        source.contactPage?.helperText
      ),
    },
    order: {
      pickupIntroText: mergeLocalizedValue(
        defaults.order.pickupIntroText,
        source.order?.pickupIntroText
      ),
      pickupConfirmationText: mergeLocalizedValue(
        defaults.order.pickupConfirmationText,
        source.order?.pickupConfirmationText
      ),
      showMenuProductImages:
        typeof source.order?.showMenuProductImages === "boolean"
          ? source.order.showMenuProductImages
          : defaults.order.showMenuProductImages,
    },
    footer: {
      shortText: mergeLocalizedValue(defaults.footer.shortText, source.footer?.shortText),
      legalText: mergeLocalizedValue(defaults.footer.legalText, source.footer?.legalText),
      copyright: mergeLocalizedValue(defaults.footer.copyright, source.footer?.copyright),
    },
    announcement: {
      enabled:
        typeof source.announcement?.enabled === "boolean"
          ? source.announcement.enabled
          : defaults.announcement.enabled,
      text: mergeLocalizedValue(defaults.announcement.text, source.announcement?.text),
      linkUrl:
        typeof source.announcement?.linkUrl === "string"
          ? sanitizeInternalOrAbsoluteHttpUrl(source.announcement.linkUrl)
          : defaults.announcement.linkUrl,
      variant:
        typeof source.announcement?.variant === "string" &&
        source.announcement.variant.trim()
          ? source.announcement.variant.trim()
          : defaults.announcement.variant,
    },
    pizzaPage: {
      sectionTitle: mergeLocalizedValue(
        defaults.pizzaPage.sectionTitle,
        source.pizzaPage?.sectionTitle
      ),
      sectionDescription: mergeLocalizedValue(
        defaults.pizzaPage.sectionDescription,
        source.pizzaPage?.sectionDescription
      ),
      featuredProductIds: Array.from(
        new Set(
          (Array.isArray(source.pizzaPage?.featuredProductIds)
            ? source.pizzaPage.featuredProductIds
            : defaults.pizzaPage.featuredProductIds
          )
            .map((value) => Number(value))
            .filter((value) => Number.isInteger(value) && value > 0)
        )
      ),
    },
    createdAt: source.createdAt || null,
    updatedAt: source.updatedAt || null,
  };
}

export function getLocalizedSiteText(value, language, fallback = "") {
  const localized = mergeLocalizedValue({ fr: fallback, en: fallback }, value);
  if (language === "en") {
    return localized.en || localized.fr || fallback;
  }
  return localized.fr || localized.en || fallback;
}
