import { apiRoutes } from "constants/apiRoutes";
import { useEffect, useState } from "react";
import apiClient from "lib/api/apiClient";
import { FetchStatus } from "./types";

interface Module {
  _id: string;
  name: string;
  number: number;
  __v: number;
}

const mapModules = (modules: Module[] | undefined) => {
  if (!modules) {
    return [];
  }
  // Sort modules by number and return only the name
  const sortedModules = modules.sort(
    (valuaA, valubeB) => valuaA.number - valubeB.number
  );
  return sortedModules.map((val) => val.name);
};

const useModules = () => {
  const [status, setStatus] = useState<FetchStatus>(FetchStatus.loading);
  const [modules, setModules] = useState<Module[] | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const { data }: { data: Module[] } = await apiClient.get(
        apiRoutes.student.getModules
      );
      return data;
    };
    fetchData()
      .then((values) => {
        setModules(values);
        setStatus(FetchStatus.succeed);
      })
      .catch((e) => {
        setStatus(FetchStatus.failed);
        setError(e);
      });
  }, []);

  return { status, modules: mapModules(modules), error };
};

export default useModules;
