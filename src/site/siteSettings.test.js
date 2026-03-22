import {
  DEFAULT_SITE_SETTINGS,
  getLocalizedSiteText,
  mergeSiteSettings,
} from "./siteSettings";

test("site settings defaults use the generic site identity", () => {
  expect(DEFAULT_SITE_SETTINGS.siteName).toBe("Flow-OS Starter");
  expect(DEFAULT_SITE_SETTINGS.seo.defaultMetaTitle.fr).toMatch(/Flow-OS Starter/i);
  expect(DEFAULT_SITE_SETTINGS.siteDescription.fr).toMatch(/Starter Flow-OS/i);
});

test("mergeSiteSettings falls back to the default site identity", () => {
  const merged = mergeSiteSettings({});

  expect(merged.siteName).toBe(DEFAULT_SITE_SETTINGS.siteName);
  expect(merged.contact.serviceArea.fr).toBe("Zone de service a personnaliser");
  expect(merged.order.showMenuProductImages).toBe(true);
});

test("getLocalizedSiteText returns the requested language when available", () => {
  const value = { fr: "Bonjour", en: "Hello" };

  expect(getLocalizedSiteText(value, "fr", "")).toBe("Bonjour");
  expect(getLocalizedSiteText(value, "en", "")).toBe("Hello");
});

test("mergeSiteSettings sanitizes external and announcement urls", () => {
  const merged = mergeSiteSettings({
    contact: {
      mapsUrl: "javascript:alert(1)",
    },
    social: {
      instagramUrl: "https://instagram.com/example",
      facebookUrl: "javascript:alert(1)",
    },
    announcement: {
      linkUrl: "javascript:alert(1)",
    },
  });

  expect(merged.contact.mapsUrl).toBe("");
  expect(merged.social.instagramUrl).toBe("https://instagram.com/example");
  expect(merged.social.facebookUrl).toBe("");
  expect(merged.announcement.linkUrl).toBe("");
});

test("mergeSiteSettings accepts the menu image visibility toggle", () => {
  const merged = mergeSiteSettings({
    order: {
      showMenuProductImages: false,
    },
  });

  expect(merged.order.showMenuProductImages).toBe(false);
});

test("mergeSiteSettings keeps local SEO pages disabled by default", () => {
  const merged = mergeSiteSettings({});

  expect(merged.seo.localPages.enabled).toBe(false);
  expect(merged.seo.localPages.items).toEqual([]);
});
