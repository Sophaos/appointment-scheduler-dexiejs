import { create } from "zustand";

interface ExpertState {
  id: number;
  resourceId: number;
  isExpertDrawerVisible: boolean;
  setId: (id: number) => void;
  setResourceId: (id: number) => void;
  setExpertDrawerVisibility: (isVisible: boolean) => void;
  toggleExpertDrawerVisibility: () => void;
}

export const useExpertStore = create<ExpertState>()((set) => ({
  id: 0,
  resourceId: 0,
  isExpertDrawerVisible: false,
  setId: (number) => set({ id: number }),
  setResourceId: (number) => set({ resourceId: number }),
  setExpertDrawerVisibility: (isVisible) => set({ isExpertDrawerVisible: isVisible }),
  toggleExpertDrawerVisibility: () => set((state) => ({ isExpertDrawerVisible: !state.isExpertDrawerVisible })),
}));
