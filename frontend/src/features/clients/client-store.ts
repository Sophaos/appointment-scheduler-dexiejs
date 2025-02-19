import { create } from "zustand";

interface ClientState {
  isClientDrawerVisible: boolean;
  setClientDrawerVisibility: (isVisible: boolean) => void;
  toggleClientDrawerVisibility: () => void;
}

export const useClientStore = create<ClientState>()((set) => ({
  isClientDrawerVisible: false,
  setClientDrawerVisibility: (isVisible) => set({ isClientDrawerVisible: isVisible }),
  toggleClientDrawerVisibility: () => set((state) => ({ isClientDrawerVisible: !state.isClientDrawerVisible })),
}));
