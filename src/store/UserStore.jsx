import { create } from 'zustand';

    const useUserStore = create((set) => ({
    user: {
        name: "",
        email: "",
        role: "",
    },

    setUser: (userData) => set({ user: userData }),

    logout: () =>
        set({
            user: {
                name: "",
                email: "",
                role: "",
            },
        }),
}));

export default useUserStore;
