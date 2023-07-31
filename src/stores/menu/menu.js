import { create } from "zustand";

export const useMenuStore = create((set) => ({
    todayMenu: [],
    setTodayMenu: (Array) => set({ todayMenu: Array }),
    
    monthMenu: [],
    setMonthMenu: (Array) => set({ monthMenu: Array })
}))
