import { create } from 'zustand';

const useLanguageStore = create((set) => ({
    language: localStorage.getItem('language') || 'en',
    setLanguage: (language) => ({language: localStorage.setItem('language', language) || 'en'}),
}));

export default useLanguageStore;