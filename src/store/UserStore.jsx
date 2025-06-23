import { create } from 'zustand';

    const useUserStore = create((set) => ({
    user: {
        name: "",
        lastName: "",
        email: "",
        role: "",
    },

    setUser: (userData) => set({ user: userData }),

    logout: () =>
        set({
            user: {
                name: "",
                lastName: "",
                email: "",
                role: "",
                regData: "",
            },
        }),
}));

export default useUserStore;
