import { create } from "zustand"

const TOTAL_QUESTIONS = 5;

export const useSurveyCount = create((set) => ({
    count: 1,
    setCountIncrement: () => set((state) => ({
        count: state.count < TOTAL_QUESTIONS ? state.count + 1 : state.count
    })),
    setCountDecrement: () => set((state) => ({
        count: state.count > 1 ? state.count - 1 : state.count
    })),
    setCountOne: () => set(() => ({
        count: 1
    }))
}));
