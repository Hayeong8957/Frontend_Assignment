import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MyPersist } from '@/types/generic';

interface IScrollState {
  scrollY: number;
  setScrollY: (y: number) => void;
}

export const useScrollStore = create<IScrollState>(
  (persist as MyPersist<IScrollState>)(
    set => ({
      scrollY: 0,
      setScrollY: (y: number) => set({ scrollY: y }),
    }),
    {
      name: 'scroll-storage',
    },
  ),
);
