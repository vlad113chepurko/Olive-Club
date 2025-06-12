import { create } from "zustand";

const useAdminUserDataStore = create((set) => ({
  userSearch: "",
  userData: [{
    name: "",
    lastName: "",
    email: "",
    phone: "",
  }],
  setUserData: (newData) => set(() => ({
    userData: newData,
  })),
  setUserSearch: (newSearch) => set(() => ({
    userSearch: newSearch,
  }))
}));


export default useAdminUserDataStore;