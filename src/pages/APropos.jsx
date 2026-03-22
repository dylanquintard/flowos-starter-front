import { Link } from "react-router-dom";
import PageFaqSection from "../components/common/PageFaqSection";
import PublicReviewsSection from "../components/reviews/PublicReviewsSection";
import SeoHead from "../components/seo/SeoHead";
import { useLanguage } from "../context/LanguageContext";
import { useSiteSettings } from "../context/SiteSettingsContext";
import { buildBaseFoodEstablishmentJsonLd } from "../seo/jsonLd";
import { DEFAULT_SITE_SETTINGS } from "../site/siteSettings";

export default function APropos() {
  const { tr } = useLanguage();
  const { settings } = useSiteSettings();
  const companyName = settings.siteName || DEFAULT_SITE_SETTINGS.siteName;
  const title = tr(
    `A propos | ${companyName}`,
    `About | ${companyName}`
  );
  const description = tr(
    `${companyName} presente son activite, sa methode de travail et sa promesse de service.`,
    `${companyName} introduces its activity, way of working and service promise.`
  );
  const canonicalSiteUrl = String(settings.seo?.canonicalSiteUrl || "").trim();
  const defaultOgImageUrl = String(settings.seo?.defaultOgImageUrl || "").trim();
  const socialUrls = [
    settings.social?.instagramUrl,
    settings.social?.facebookUrl,
    settings.social?.tiktokUrl,
  ].filter(Boolean);
  const aboutJsonLd = [
    buildBaseFoodEstablishmentJsonLd({
      pagePath: "/a-propos",
      pageName: title,
      description,
      siteName: companyName,
      siteUrl: canonicalSiteUrl || undefined,
      phone: settings.contact?.phone,
      email: settings.contact?.email,
      address: settings.contact?.address,
      mapUrl: settings.contact?.mapsUrl,
      image: defaultOgImageUrl,
      socialUrls,
      areaServed: [
        String(settings.contact?.serviceArea?.fr || "").trim() || "Zone de service",
      ],
      extra: {
        "@type": "LocalBusiness",
      },
    }),
  ].filter(Boolean);

  return (
    <div className="section-shell space-y-8 pb-20 pt-10">
      <SeoHead
        title={title}
        description={description}
        pathname="/a-propos"
        jsonLd={aboutJsonLd}
      />

      <header className="space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-saffron">{tr("A propos", "About")}</p>
        <h1 className="font-display text-4xl uppercase tracking-wide text-white sm:text-5xl">
          {tr(
            `${companyName}, une base Flow-OS a personnaliser`,
            `${companyName}, a customizable Flow-OS foundation`
          )}
        </h1>
        <p className="max-w-3xl text-sm text-stone-300 sm:text-base">
          {tr(
            `${companyName} sert ici de base propre pour presenter une marque, un savoir-faire et une offre locale sans repartir de zero.`,
            `${companyName} acts here as a clean foundation to present a brand, know-how and a local offer without starting from scratch.`
          )}
        </p>
        <p className="max-w-3xl text-sm text-stone-300 sm:text-base">
          {tr(
            "Le contenu, les horaires, la carte, les visuels et les zones de service peuvent ensuite etre adaptes a chaque tenant.",
            "Content, opening hours, menu, visuals and service areas can then be tailored to each tenant."
          )}
        </p>
        <Link
          to="/planing"
          className="inline-flex rounded-full border border-saffron/70 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-saffron transition hover:bg-saffron/10"
        >
          {tr("Voir les horaires et disponibilites", "See opening hours and availability")}
        </Link>
      </header>

      <section className="glass-panel p-6">
        <h2 className="text-xl font-bold text-white">{tr("Une base simple a reprendre", "A simple foundation to reuse")}</h2>
        <p className="mt-3 text-sm text-stone-300">
          {tr(
            "Cette page n est plus liee a un cas client precis. Elle sert a decrire l activite, les points forts de l offre et le fonctionnement concret du service.",
            "This page is no longer tied to one specific client case. It is meant to describe the activity, the strengths of the offer and the practical workflow of the service."
          )}
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-stone-300">
          <li>{tr("presentation claire de l activite", "clear presentation of the activity")}</li>
          <li>{tr("positionnement et promesse de service", "positioning and service promise")}</li>
          <li>{tr("liens directs vers la carte et les horaires", "direct links to the menu and schedule")}</li>
        </ul>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="glass-panel p-6">
          <h2 className="text-xl font-bold text-white">{tr("Une offre editable", "An editable offer")}</h2>
          <p className="mt-3 text-sm text-stone-300">
            {tr(
              "Le starter est concu pour permettre a chaque tenant de revoir son contenu sans toucher a la structure technique du site.",
              "The starter is designed so each tenant can revise its content without touching the technical structure of the website."
            )}
          </p>
        </article>
        <article className="glass-panel p-6">
          <h2 className="text-xl font-bold text-white">{tr("Une base exploitable vite", "A base that can be used quickly")}</h2>
          <p className="mt-3 text-sm text-stone-300">
            {tr(
              "L objectif est de gagner du temps au deploiement, tout en gardant la possibilite d adapter le ton, les visuels et les modules actifs selon le plan du tenant.",
              "The goal is to save time during rollout while preserving the ability to adjust tone, visuals and active modules depending on the tenant plan."
            )}
          </p>
        </article>
      </section>

      <PublicReviewsSection className="space-y-5" />

      <PageFaqSection
        pathname="/a-propos"
        title={tr("Questions frequentes", "Frequently asked questions")}
      />
    </div>
  );
}
