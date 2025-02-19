import { create } from "zustand";

interface ExpertState {
  isExpertDrawerVisible: boolean;
  setExpertDrawerVisibility: (isVisible: boolean) => void;
  toggleExpertDrawerVisibility: () => void;
}

export const useExpertStore = create<ExpertState>()((set) => ({
  isExpertDrawerVisible: false,
  setExpertDrawerVisibility: (isVisible) => set({ isExpertDrawerVisible: isVisible }),
  toggleExpertDrawerVisibility: () => set((state) => ({ isExpertDrawerVisible: !state.isExpertDrawerVisible })),
}));
