import { create } from "zustand";
import * as types from "@/types/types";

const useFilmsStore = create<types.FilmsStore>()((set) => ({
  search: "",
  currentPage: 1,
  setSearch: (search: string) => set({ search, currentPage: 1 }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  reset: () => set({ search: "", currentPage: 1 }),
}));

export default useFilmsStore;
