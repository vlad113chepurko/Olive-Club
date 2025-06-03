import { create } from "zustand"

export const useSurveyCount = create((set) => ({
    count: 1,
    setCountIncrement: () => set((state) => ({
        count: state.count + 1
    })),
    setCountDecrement: () => set((state) => ({
        count: state.count - 1
    }))
}));