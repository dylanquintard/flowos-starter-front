import { Link, useLocation, useParams } from "react-router-dom";
import PageFaqSection from "../components/common/PageFaqSection";
import SeoHead from "../components/seo/SeoHead";
import { useLanguage } from "../context/LanguageContext";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { buildBaseFoodEstablishmentJsonLd, buildBreadcrumbJsonLd } from "../seo/jsonLd";
import { DEFAULT_SITE_SETTINGS } from "../site/siteSettings";

function slugifyCity(value) {
  return String(value || "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getLocalizedValue(value, language, fallback = "") {
  const french = String(value?.fr || "").trim();
  const english = String(value?.en || "").trim();
  if (language === "en") {
    return english || french || fallback;
  }
  return french || english || fallback;
}

function CityPageNotFound({ citySlug }) {
  const pathname = citySlug ? `/pizza-${citySlug}` : "/404";
  return (
    <div className="section-shell space-y-6 pb-20 pt-12">
      <SeoHead
        title={`Page locale non disponible | ${DEFAULT_SITE_SETTINGS.siteName}`}
        description="Cette page locale n'est pas disponible."
        pathname={pathname}
        robots="noindex,nofollow"
      />
      <h1 className="font-display text-4xl uppercase tracking-wide text-white sm:text-5xl">
        Page locale non disponible
      </h1>
      <p className="max-w-2xl text-sm text-stone-300 sm:text-base">
        Cette page n est pas active ou n a pas encore ete configuree dans l administration du site.
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          to="/"
          className="rounded-full bg-saffron px-4 py-2 text-xs font-bold uppercase tracking-wide text-charcoal transition hover:bg-yellow-300"
        >
          Retour a l accueil
        </Link>
        <Link
          to="/planing"
          className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
        >
          Voir les horaires
        </Link>
      </div>
    </div>
  );
}

export default function CitySeoPage({ forcedCitySlug = "" }) {
  const { language } = useLanguage();
  const { settings } = useSiteSettings();
  const location = useLocation();
  const params = useParams();
  const rawCity = forcedCitySlug || params.city || params["*"] || "";
  const requestedSlug = slugifyCity(rawCity);
  const localPages = Array.isArray(settings.seo?.localPages?.items)
    ? settings.seo.localPages.items
    : [];
  const localPagesEnabled = Boolean(settings.seo?.localPages?.enabled);
  const matchingPage = localPages.find(
    (entry) => slugifyCity(entry?.slug) === requestedSlug
  );

  const title = getLocalizedValue(matchingPage?.title, language, "");
  const intro = getLocalizedValue(matchingPage?.intro, language, "");
  const isPublished =
    localPagesEnabled &&
    Boolean(matchingPage?.enabled) &&
    Boolean(requestedSlug) &&
    Boolean(title) &&
    Boolean(intro);

  if (!isPublished) {
    return <CityPageNotFound citySlug={requestedSlug} />;
  }

  const siteName = settings.siteName || DEFAULT_SITE_SETTINGS.siteName;
  const canonicalPath = `/pizza-${requestedSlug}`;
  const canonicalSiteUrl = String(settings.seo?.canonicalSiteUrl || "").trim();
  const description = intro;
  const jsonLd = [
    buildBaseFoodEstablishmentJsonLd({
      pagePath: canonicalPath,
      pageName: title,
      description,
      siteName,
      siteUrl: canonicalSiteUrl || undefined,
      phone: settings.contact?.phone,
      email: settings.contact?.email,
      address: settings.contact?.address,
      mapUrl: settings.contact?.mapsUrl,
      image: settings.seo?.defaultOgImageUrl,
      socialUrls: [
        settings.social?.instagramUrl,
        settings.social?.facebookUrl,
        settings.social?.tiktokUrl,
      ],
      areaServed: [title],
    }),
    buildBreadcrumbJsonLd(
      [
        { name: "Accueil", path: "/" },
        { name: "Horaires", path: "/planing" },
        { name: title, path: canonicalPath },
      ],
      canonicalSiteUrl || undefined
    ),
  ].filter(Boolean);

  return (
    <div className="section-shell space-y-8 pb-20 pt-10">
      <SeoHead
        title={title}
        description={description}
        pathname={canonicalPath}
        jsonLd={jsonLd}
      />

      <header className="space-y-3">
        <h1 className="font-display text-4xl uppercase tracking-wide text-white sm:text-5xl">
          {title}
        </h1>
        <p className="max-w-3xl text-sm text-stone-300 sm:text-base">{intro}</p>
      </header>

      <section className="glass-panel p-6">
        <h2 className="text-lg font-bold text-white">Decouvrir l offre</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/menu"
            className="rounded-full bg-saffron px-4 py-2 text-xs font-bold uppercase tracking-wide text-charcoal transition hover:bg-yellow-300"
          >
            Voir le menu
          </Link>
          <Link
            to="/planing"
            className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
          >
            Consulter les horaires et disponibilites
          </Link>
        </div>
      </section>

      <PageFaqSection
        pathname={canonicalPath}
        title={`Questions frequentes sur ${title}`}
      />
    </div>
  );
}
