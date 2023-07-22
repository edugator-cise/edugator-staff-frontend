import { apiRoutes } from "constants/apiRoutes"
import apiClient from "lib/api/apiClient"
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";


export interface Organization {
  id: string;
  name: string;
  logo: string;

}
const fetchAllOrganization = async () => {
  const { data } = await apiClient.get(apiRoutes.v2.organization.getAll);
  return data;
}

export const useGetAllOrganization = () => {
  return useQuery<Organization[], Error>({
    refetchOnWindowFocus: false,
    queryKey: ["organization"],
    queryFn: () => fetchAllOrganization(),
    onError: () => {
      toast.error("Error loading Organizations");
    }
  })
}