import { createContext, useContext, useState } from "react";

type CheckboxContextType = {
  cpp: boolean;
  setCpp: (value: boolean) => void;
  py: boolean;
  setPy: (value: boolean) => void;
};

const CheckboxContext = createContext<CheckboxContextType>({
  cpp: false,
  setCpp: () => {},
  py: false,
  setPy: () => {},
});

export const useCheckboxContext = () => useContext(CheckboxContext);

export const CheckboxProvider: React.FC = ({ children }) => {
  const [cpp, setCpp] = useState(false);
  const [py, setPy] = useState(false);

  return (
    <CheckboxContext.Provider value={{ cpp, setCpp, py, setPy }}>
      {children}
    </CheckboxContext.Provider>
  );
};