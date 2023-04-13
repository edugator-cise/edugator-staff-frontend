import { createContext, useContext, useState } from "react";

type CheckboxContextType = {
  languages: {
    name: string;
    selected: boolean;
  }[];
  setLanguages: (value: {name: string, selected: boolean}[]) => void;
};

const CheckboxContext = createContext<CheckboxContextType>({
  languages: [
    {
      name: "cpp",
      selected: false
    },
    {
      name: "py",
      selected: false
    },
    {
      name: "java",
      selected: false
    }
  ],
  setLanguages: () => {
    
  },
});

export const useCheckboxContext = () => useContext(CheckboxContext);

export const CheckboxProvider: React.FC = ({ children }) => {
  const [languages, setLanguages] = useState([
    {
      name: "cpp",
      selected: false
    },
    {
      name: "py",
      selected: false
    },
    {
      name: "java",
      selected: false
    }
  ]);

  return (
    <CheckboxContext.Provider value={{ languages, setLanguages }}>
      {children}
    </CheckboxContext.Provider>
  );
};
