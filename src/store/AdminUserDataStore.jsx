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
  })),
  removeUser: (email) => set((state) => ({
    userData: state.userData.filter((user) => user.email !== email)
  }))
}));


export default useAdminUserDataStore;