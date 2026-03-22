export const ADMIN_NAV_LINKS = Object.freeze([
  { to: "/admin/orders", labelFr: "Commandes", labelEn: "Orders", requiredModules: ["opt_orders", "opt_order_management"] },
  { to: "/admin/tickets", labelFr: "Tickets", labelEn: "Tickets", requiredModules: ["opt_orders", "opt_print_pi"] },
  { to: "/admin/menu", labelFr: "Menu", labelEn: "Menu", requiredModules: ["opt_menu_management"] },
  {
    to: "/admin/timeslots",
    labelFr: "Horaires & Emplacements",
    labelEn: "Schedules & Locations",
    requiredModules: ["opt_business_hours", "opt_location_management"],
  },
  { to: "/admin/gallery", labelFr: "Galerie", labelEn: "Gallery", requiredModules: ["opt_gallery"] },
  { to: "/admin/print", labelFr: "Camions & Impressions", labelEn: "Trucks & Printing", requiredModules: ["opt_print_pi"] },
  { to: "/admin/users", labelFr: "Clients", labelEn: "Users", requiredModules: ["opt_customer_accounts"] },
  { to: "/admin/blog", labelFr: "Blog", labelEn: "Blog", requiredModules: ["opt_blog"] },
  { to: "/admin/faq", labelFr: "FAQ", labelEn: "FAQ", requiredModules: ["opt_faq"] },
  { to: "/admin/site-info", labelFr: "Info site", labelEn: "Site info", requiredModules: ["opt_site_information", "opt_contact"] },
]);

export function getAdminNavLinks(tr) {
  return ADMIN_NAV_LINKS.map((item) => ({
    ...item,
    to: item.to,
    label: typeof tr === "function" ? tr(item.labelFr, item.labelEn) : item.labelFr,
  }));
}
