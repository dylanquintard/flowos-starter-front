import api from "./http";

export async function getPublicFeatures() {
  const response = await api.get("/saas/public/features");
  return response.data;
}
