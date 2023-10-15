import { create } from 'zustand';

interface IFilterState {
  headline: string;
  date: string;
  countries: string[];
  isModalOpen: boolean;
  setHeadline: (headline: string) => void;
  setDate: (date: string) => void;
  setCountries: (countries: string[]) => void;
  toggleModal: () => void;
}

export const useFilterStore = create<IFilterState>(set => ({
  headline: '',
  date: '',
  countries: [],
  isModalOpen: false,
  setHeadline: headline => set({ headline }),
  setDate: date => set({ date }),
  setCountries: countries => set({ countries }),
  toggleModal: () => set(state => ({ isModalOpen: !state.isModalOpen })),
}));
