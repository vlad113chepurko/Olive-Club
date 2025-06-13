import { create } from 'zustand';

const useFormStore = create((set => ({
  form: {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    repeatPassword: ''
  },

  setForm: (newData) => set((state) => ({
    form: {
      ...state.form,
      ...newData,
    }
  })),

  removeValues: () => set(() => ({
    form: {}
  }))

})))

export default useFormStore;

