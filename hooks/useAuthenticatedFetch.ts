import apiClient from "lib/api/apiClient";


export const useAuthenticatedFetch = <T>() => {
  const authenticatedFetch = async (url: string) => {
    const { data }: { data: T } = await apiClient.get(url, {
      headers: {
        'Authorization': `Bearer `
      }
    })
    return data;
  }
  return authenticatedFetch;
}