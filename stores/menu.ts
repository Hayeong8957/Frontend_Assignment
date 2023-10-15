import { create } from 'zustand';

interface IMenuState {
  focusedMenu: number;
  setFocusedMenu: (menu: number) => void;
}

export const useMenuStore = create<IMenuState>(set => ({
  focusedMenu: 1,
  setFocusedMenu: menuId => set({ focusedMenu: menuId }),
}));
