import apiClient from "lib/api/apiClient";
import { useAuth } from "@clerk/nextjs";

const AUTH_JWT_TEMPLATE = "edugator-api-v3"

export const useAuthenticatedFetch = <T>() => {
  const { getToken } = useAuth();
  const authenticatedFetch = async (url: string) => {
    const token = await getToken({
      template: AUTH_JWT_TEMPLATE
    });
    console.log(token)
    const { data }: { data: T } = await apiClient.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return data;
  }
  return authenticatedFetch;
}