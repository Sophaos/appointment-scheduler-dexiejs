import { create } from "zustand";

interface ServiceStore {
  isServiceDrawerVisible: boolean;
  setServiceDrawerVisibility: (isVisible: boolean) => void;
  toggleServiceDrawerVisibility: () => void;
}

export const useServiceStore = create<ServiceStore>()((set) => ({
  isServiceDrawerVisible: false,
  setServiceDrawerVisibility: (isVisible) => set({ isServiceDrawerVisible: isVisible }),
  toggleServiceDrawerVisibility: () => set((state) => ({ isServiceDrawerVisible: !state.isServiceDrawerVisible })),
}));
