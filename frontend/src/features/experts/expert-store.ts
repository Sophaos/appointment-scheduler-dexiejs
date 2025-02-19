import { create } from "zustand";

interface ExpertState {
  id: number;
  isExpertDrawerVisible: boolean;
  setId: (id: number) => void;
  setExpertDrawerVisibility: (isVisible: boolean) => void;
  toggleExpertDrawerVisibility: () => void;
}

export const useExpertStore = create<ExpertState>()((set) => ({
  id: 0,
  isExpertDrawerVisible: false,
  setId: (number) => set({ id: number }),
  setExpertDrawerVisibility: (isVisible) => set({ isExpertDrawerVisible: isVisible }),
  toggleExpertDrawerVisibility: () => set((state) => ({ isExpertDrawerVisible: !state.isExpertDrawerVisible })),
}));
