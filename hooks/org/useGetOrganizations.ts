import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "constants/apiRoutes";
import apiClient from "lib/api/apiClient";

export interface Organization {
  id: string;
  name: string;
  logo: string;
  createdAt: string;
  updatedAt: string;
}

export const ORGANIZATION_QUERY_KEY = "organizations";

export const useGetOrganizations = () => {
  const fetchOrganizations = async (): Promise<Organization[]> => {
    const { data } = await apiClient.get(apiRoutes.v2.admin.getOrganizations());
    return data;
  };

  return useQuery<Organization[], Error>({
    queryKey: [ORGANIZATION_QUERY_KEY],
    queryFn: () => fetchOrganizations(),
    refetchOnWindowFocus: false,
  });
};
