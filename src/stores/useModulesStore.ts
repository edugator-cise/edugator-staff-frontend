import create from "zustand";

interface ModuleState {
  modules: string[] | null;
  setModules: (modules: string[]) => void;
}

export const useModuleStore = create<ModuleState>((set) => ({
  modules: [],
  setModules: (modules: string[]) => set({ modules }),
}));
