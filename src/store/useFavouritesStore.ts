import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as types from "@/types/types";

const useFavouritesStore = create<types.FavouritesStore>()(
  persist(
    (set, get) => ({
      favourites: [],
      addFavourite: (item: types.Favourite) =>
        set((state) => ({
          favourites: [...state.favourites, item],
        })),
      removeFavourite: (url: string) =>
        set((state) => ({
          favourites: state.favourites.filter((f) => f.url !== url),
        })),
      isFavourite: (url: string) => get().favourites.some((f) => f.url === url),
    }),
    {
      name: "star-wars-favourites-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useFavouritesStore;
