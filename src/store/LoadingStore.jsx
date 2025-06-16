import { create } from 'zustand';

const useLoadingStore = create((set) => ({
  loadingTimer: true,
  loading: false,
  setLoadingTimer: (state) => set({loadingTimer: state}),
  setLoading: (state) => set({loading: state}),
}))

export default useLoadingStore;