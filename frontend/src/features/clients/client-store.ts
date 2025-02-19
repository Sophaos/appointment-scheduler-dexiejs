import { create } from "zustand";

interface ClientState {
  id: number;
  isClientDrawerVisible: boolean;
  setId: (id: number) => void;
  setClientDrawerVisibility: (isVisible: boolean) => void;
  toggleClientDrawerVisibility: () => void;
}

export const useClientStore = create<ClientState>()((set) => ({
  id: 0,
  isClientDrawerVisible: false,
  setId: (number) => set({ id: number }),
  setClientDrawerVisibility: (isVisible) => set({ isClientDrawerVisible: isVisible }),
  toggleClientDrawerVisibility: () => set((state) => ({ isClientDrawerVisible: !state.isClientDrawerVisible })),
}));
