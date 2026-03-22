import { describe, expect, it } from "vitest";
import {
  buildTenantFeatureAccess,
  createLoadingTenantFeatureAccess,
  isAdminLinkEnabled,
} from "./tenantFeatures";

describe("tenantFeatures", () => {
  it("derives starter/pro capability flags from enabled module codes", () => {
    const access = buildTenantFeatureAccess({
      subscription: { planCode: "pro" },
      modules: [
        { code: "opt_orders", enabled: true },
        { code: "opt_print_pi", enabled: true },
        { code: "opt_customer_accounts", enabled: true },
        { code: "opt_menu_management", enabled: true },
      ],
    });

    expect(access.planCode).toBe("pro");
    expect(access.isOrderingEnabled).toBe(true);
    expect(access.isPrintingEnabled).toBe(true);
    expect(access.isCustomerAccountsEnabled).toBe(true);
    expect(access.isCustomerOrderingEnabled).toBe(true);
    expect(access.isMenuEnabled).toBe(true);
    expect(access.isBlogEnabled).toBe(false);
  });

  it("requires both orders and customer accounts for customer ordering", () => {
    const access = buildTenantFeatureAccess({
      modules: [{ code: "opt_orders", enabled: true }],
    });

    expect(access.isOrderingEnabled).toBe(true);
    expect(access.isCustomerAccountsEnabled).toBe(false);
    expect(access.isCustomerOrderingEnabled).toBe(false);
  });

  it("filters admin links against required modules", () => {
    const access = buildTenantFeatureAccess({
      modules: [{ code: "opt_blog", enabled: true }],
    });

    expect(isAdminLinkEnabled({ requiredModules: ["opt_blog"] }, access)).toBe(true);
    expect(isAdminLinkEnabled({ requiredModules: ["opt_orders"] }, access)).toBe(false);
    expect(isAdminLinkEnabled({}, createLoadingTenantFeatureAccess())).toBe(true);
  });
});
