export function isTenantAdminPanelUser(user) {
  const role = String(user?.activeMembership?.role || "").trim().toUpperCase();
  return role === "TENANT_ADMIN" || role === "SUPER_ADMIN";
}
