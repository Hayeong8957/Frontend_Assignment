import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IScrappedState {
  scrappedIds: string[];
  addScrap: (id: string) => void;
  removeScrap: (id: string) => void;
}

export const useScrappedStore = create<IScrappedState>(
  persist(
    set => ({
      scrappedIds: [],
      addScrap: (id: string) => set((state: IScrappedState) => ({ scrappedIds: [...state.scrappedIds, id] })),
      removeScrap: (id: string) =>
        set((state: IScrappedState) => ({ scrappedIds: state.scrappedIds.filter((prevId: string) => prevId !== id) })),
    }),
    {
      name: 'scrapped-storage',
    },
  ) as any, // 명시적으로 타입 어설션을 사용해서 컴파일러에게 안전하다고 알려줌
);
