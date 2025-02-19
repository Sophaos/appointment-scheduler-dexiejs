import { create } from "zustand";

interface ServiceStore {
  id: number;
  isServiceDrawerVisible: boolean;
  setId: (id: number) => void;
  setServiceDrawerVisibility: (isVisible: boolean) => void;
  toggleServiceDrawerVisibility: () => void;
}

export const useServiceStore = create<ServiceStore>()((set) => ({
  id: 0,
  isServiceDrawerVisible: false,
  setId: (number) => set({ id: number }),
  setServiceDrawerVisibility: (isVisible) => set({ isServiceDrawerVisible: isVisible }),
  toggleServiceDrawerVisibility: () => set((state) => ({ isServiceDrawerVisible: !state.isServiceDrawerVisible })),
}));
