import { create } from 'zustand';

interface INewsUrlState {
  newsUrl: string;
  setNewsUrl: (url: string) => void;
}

export const useNewsUrlStore = create<INewsUrlState>(set => ({
  newsUrl: '',
  setNewsUrl: url => set({ newsUrl: url }),
}));
