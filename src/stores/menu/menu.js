import { create } from "zustand";

export const useMenuStore = create((set) => ({
    todayMenu: [],
    setTodayMenu: (Array) => set({ todayMenu: Array }),

    thisWeekMenu: [],
    setThisWeekMenu: (Array) => set({ thisWeekMenu: Array }),
    
    monthMenu: [],
    setMonthMenu: (Array) => set({ monthMenu: Array })
}))
