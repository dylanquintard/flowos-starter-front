const FEATURE_ALIASES = Object.freeze({
  ordering: ["opt_orders", "opt_order_management"],
  customerAccounts: ["opt_customer_accounts"],
  printing: ["opt_print_pi"],
  mobileOperations: ["opt_mobile_operations"],
  staffAccess: ["opt_staff_access"],
  menu: ["opt_menu_management"],
  schedules: ["opt_business_hours", "opt_location_management"],
  gallery: ["opt_gallery"],
  blog: ["opt_blog"],
  faq: ["opt_faq"],
  siteInfo: ["opt_site_information", "opt_contact"],
});

export function buildTenantFeatureAccess(payload = {}) {
  const modules = Array.isArray(payload?.modules) ? payload.modules : [];
  const enabledCodes = new Set(
    modules
      .filter((entry) => Boolean(entry?.enabled))
      .map((entry) => String(entry?.code || "").trim().toLowerCase())
      .filter(Boolean)
  );

  const hasAny = (codes = []) =>
    codes.some((code) => enabledCodes.has(String(code || "").trim().toLowerCase()));

  const isOrderingEnabled = hasAny(FEATURE_ALIASES.ordering);
  const isCustomerAccountsEnabled = hasAny(FEATURE_ALIASES.customerAccounts);
  const isCustomerOrderingEnabled = isOrderingEnabled && isCustomerAccountsEnabled;

  return {
    loading: false,
    planCode: String(payload?.subscription?.planCode || "").trim().toLowerCase() || null,
    moduleCodes: [...enabledCodes],
    isOrderingEnabled,
    isCustomerAccountsEnabled,
    isCustomerOrderingEnabled,
    isPrintingEnabled: hasAny(FEATURE_ALIASES.printing),
    isMobileOperationsEnabled: hasAny(FEATURE_ALIASES.mobileOperations),
    isStaffAccessEnabled: hasAny(FEATURE_ALIASES.staffAccess),
    isMenuEnabled: hasAny(FEATURE_ALIASES.menu),
    isSchedulesEnabled: hasAny(FEATURE_ALIASES.schedules),
    isGalleryEnabled: hasAny(FEATURE_ALIASES.gallery),
    isBlogEnabled: hasAny(FEATURE_ALIASES.blog),
    isFaqEnabled: hasAny(FEATURE_ALIASES.faq),
    isSiteInfoEnabled: hasAny(FEATURE_ALIASES.siteInfo),
    hasModule(code) {
      return enabledCodes.has(String(code || "").trim().toLowerCase());
    },
  };
}

export function createLoadingTenantFeatureAccess() {
  return {
    loading: true,
    planCode: null,
    moduleCodes: [],
    isOrderingEnabled: false,
    isCustomerAccountsEnabled: false,
    isCustomerOrderingEnabled: false,
    isPrintingEnabled: false,
    isMobileOperationsEnabled: false,
    isStaffAccessEnabled: false,
    isMenuEnabled: false,
    isSchedulesEnabled: false,
    isGalleryEnabled: false,
    isBlogEnabled: false,
    isFaqEnabled: false,
    isSiteInfoEnabled: false,
    hasModule() {
      return false;
    },
  };
}

export function isAdminLinkEnabled(link = {}, access = createLoadingTenantFeatureAccess()) {
  const requiredModules = Array.isArray(link?.requiredModules) ? link.requiredModules : [];
  if (requiredModules.length === 0) return true;
  return requiredModules.some((code) => access.hasModule(code));
}
