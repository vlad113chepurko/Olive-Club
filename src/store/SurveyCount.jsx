import {create} from "zustand"

export const useSurveyCount = create((set) => ({
  count: 0,
  setCountIncrement: () => set((state) => ({
    count: state.count + 1
  })),
  setCountDecrement: () => set((state) => ({
    count: state.count - 1
  })),
    resetCount: () => set(() => ({
    count: 0
  }))
}));
