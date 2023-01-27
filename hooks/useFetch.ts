import { useEffect, useState } from "react";
import apiClient from "lib/api/apiClient";

export enum FetchStatus {
  loading,
  succeed,
  failed,
}
export const useFetch = <T>(
  url: string
): { status: FetchStatus; data: T | undefined; error: Error | undefined } => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.loading);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: T } = await apiClient.get(url);
      return data;
    };
    fetchData()
      .then((values) => {
        setData(values);
        setStatus(FetchStatus.succeed);
      })
      .catch((e) => {
        setStatus(FetchStatus.failed);
        setError(e);
      });
  });
  return { status, data, error };
};
