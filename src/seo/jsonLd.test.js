import { buildBaseFoodEstablishmentJsonLd } from "./jsonLd";

test("JSON-LD defaults use the generic site branding", () => {
  const jsonLd = buildBaseFoodEstablishmentJsonLd();

  expect(jsonLd.name).toBe("Flow-OS Starter");
  expect(jsonLd.mainEntityOfPage.name).toBe("Flow-OS Starter");
  expect(jsonLd.areaServed).toEqual(["Zone de service"]);
});

test("JSON-LD uses provided values when available", () => {
  const jsonLd = buildBaseFoodEstablishmentJsonLd({
    pagePath: "/menu",
    pageName: "Menu pizzas",
    siteName: "Alban Pizzas",
    description: "Carte artisanale",
  });

  expect(jsonLd.name).toBe("Alban Pizzas");
  expect(jsonLd.mainEntityOfPage.name).toBe("Menu pizzas");
  expect(jsonLd.description).toBe("Carte artisanale");
});
