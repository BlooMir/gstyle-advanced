import { create } from 'zustand';

// 모달 여닫이
export const useModalStore = create((set) => ({
    isOpen: false,
    setIsOpen: (Boolean) => set({ isOpen: Boolean })
}));

