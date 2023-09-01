import { create } from "zustand";

export const useMenuStore = create((set) => ({
    todayMenu: [],
    setTodayMenu: (Array) => set({ todayMenu: Array }),

    weekMenu: [],
    setWeekMenu: (Array) => set({ weekMenu: Array }),
    
    monthMenu: [],
    setMonthMenu: (Array) => set({ monthMenu: Array })
}))
