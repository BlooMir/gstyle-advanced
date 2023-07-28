import { atom } from "recoil"

// 모달 오픈 state
export const modalState = atom({
    key: "modalState",
    default: false
})

// 오늘 메뉴 state
export const todayMenuState = atom({
    key: `todayMenuState`,
    default: []
})