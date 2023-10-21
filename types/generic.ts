import { StateCreator } from 'zustand';
import { PersistOptions } from 'zustand/middleware';

export type MyPersist<T> = (config: StateCreator<T>, options: PersistOptions<T, Partial<T>>) => StateCreator<T>;
