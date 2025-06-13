import { create } from "zustand";

const useCountriesStore = create((set) => ({
  countries: [],
  selected: 0,

  setCountries: (countries) => set({ countries }),

  setSelected: (selected) => set({ selected }),
}));

export default useCountriesStore;
