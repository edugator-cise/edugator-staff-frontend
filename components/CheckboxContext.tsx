import { createContext, useContext, useState } from "react";

type CheckboxContextType = {
  languages: {
    language: string;
    selected: boolean;
  }[];
  setLanguages: (value: {language: string, selected: boolean}[]) => void;
};

const CheckboxContext = createContext<CheckboxContextType>({
  languages: [
    {
      language: "C++",
      selected: false
    },
    {
      language: "Python",
      selected: false
    },
    {
      language: "Java",
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
      language: "C++",
      selected: false
    },
    {
      language: "Python",
      selected: false
    },
    {
      language: "Java",
      selected: false
    }
  ]);

  return (
    <CheckboxContext.Provider value={{ languages, setLanguages }}>
      {children}
    </CheckboxContext.Provider>
  );
};
