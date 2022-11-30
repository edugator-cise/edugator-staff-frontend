import { useEffect, useState } from "react";
import { Service } from "../../utils/fetchUtils/types";

interface Module {
  _id: string;
  name: string;
  number: number;
  __v: number;
}

const mapModules = (modules: Module[]) => {
  // Sort modules by number and return only the name
  const sortedModules = modules.sort(
    (valuaA, valubeB) => valuaA.number - valubeB.number
  );
  return sortedModules.map((val) => val.name);
};

const useModules = () => {
  const [result, setResult] = useState<Service<string[]>>({
    status: "loading",
  });

  useEffect(() => {
    setResult({ status: "loading" });
    fetch(`https://edugator-admin.com/v1/module/`)
      .then((response) => response.json())
      .then((response) =>
        setResult({ status: "loaded", payload: mapModules(response) })
      )
      .catch((error) => setResult({ status: "error", error }));
  }, []);

  return result;
};

export default useModules;
