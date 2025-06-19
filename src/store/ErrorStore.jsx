import { create } from 'zustand';

const useErrorStore = create((set) => ({
  isError: false,
  errorMessage: '',
  setError: (isError, message) => {
    set({ isError, errorMessage: message });
  },
  clearError: () => {
    set({ isError: false, errorMessage: '' });
  }
}))

export default useErrorStore;