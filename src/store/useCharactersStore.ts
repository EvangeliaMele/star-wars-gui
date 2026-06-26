import { create } from "zustand";
import * as types from "@/types/types";

const useCharactersStore = create<types.CharactersStore>()((set) => ({
  search: "",
  currentPage: 1,
  setSearch: (search: string) => set({ search, currentPage: 1 }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  reset: () => set({ search: "", currentPage: 1 }),
}));

export default useCharactersStore;
