import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SearchState {
  query: string;
  setQuery: (query: string) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>()(
  devtools(
    (set) => ({
      query: "",
      setQuery: (query: string) => set({ query }),
      clearSearch: () => set({ query: "" }),
    }),
    {
      name: "search-store",
    },
  ),
);
