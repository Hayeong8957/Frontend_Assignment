import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MyPersist } from '@/types/generic';

interface IScrappedState {
  scrappedIds: string[];
  addScrap: (id: string) => void;
  removeScrap: (id: string) => void;
}

export const useScrappedStore = create<IScrappedState>(
  (persist as MyPersist<IScrappedState>)(
    set => ({
      scrappedIds: [],
      addScrap: (id: string) => set((state: IScrappedState) => ({ scrappedIds: [...state.scrappedIds, id] })),
      removeScrap: (id: string) =>
        set((state: IScrappedState) => ({ scrappedIds: state.scrappedIds.filter((prevId: string) => prevId !== id) })),
    }),
    {
      name: 'scrapped-storage',
    },
  ),
);
