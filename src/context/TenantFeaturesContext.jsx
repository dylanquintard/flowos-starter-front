import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getPublicFeatures } from "../api/saas.api";
import {
  buildTenantFeatureAccess,
  createLoadingTenantFeatureAccess,
} from "../utils/tenantFeatures";

export const TenantFeaturesContext = createContext(createLoadingTenantFeatureAccess());

export function TenantFeaturesProvider({ children }) {
  const [access, setAccess] = useState(createLoadingTenantFeatureAccess());

  useEffect(() => {
    let cancelled = false;

    async function hydrateFeatures() {
      try {
        const payload = await getPublicFeatures();
        if (cancelled) return;
        setAccess(buildTenantFeatureAccess(payload));
      } catch (_error) {
        if (cancelled) return;
        setAccess((current) => ({
          ...current,
          loading: false,
        }));
      }
    }

    hydrateFeatures();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => access, [access]);

  return (
    <TenantFeaturesContext.Provider value={value}>
      {children}
    </TenantFeaturesContext.Provider>
  );
}

export function useTenantFeatures() {
  return useContext(TenantFeaturesContext);
}
