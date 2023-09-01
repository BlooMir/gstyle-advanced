import axios from "axios";
import dayjs from "dayjs";

// 현재 날짜 기준 달의 모든 급식 데이터 불러오기
export const fetchMonthMeal = async () => {
    // 오늘 날짜 dayjs로 찾고 포맷 바꾸기
    const currentDate = dayjs().format('YYYY-MM-DD');
    
    // 오늘 날짜 기준 월의 시작일 dayjs로 찾고 포맷 바꾸기
    const currentDateMonthStart = dayjs(currentDate).startOf('month').format('YYYY-MM-DD');

    // 오늘 날짜 기준 월의 마지막일 dayjs로 찾고 포맷 바꾸기
    const currentDateMonthEnd = dayjs(currentDate).endOf('month').format('YYYY-MM-DD');

    // 월 별 전체 급식 데이터 호출
    const response = await axios.get(`/api/menu/period?fromDate=${currentDateMonthStart}&toDate=${currentDateMonthEnd}`)

    
    return response.data;
}
export const fetchWeekMeal = async () => {
    // 금일 날짜 확인(사용자 디바이스 기준)
    const currentDate = dayjs().format('YYYY-MM-DD');

    // 금일 날짜 기준 한 주의 시작(일요일) + 1일 = 월요일 찾기
    const currentDateMonday = dayjs(currentDate).startOf('week').add(1, 'day').format('YYYY-MM-DD');

    // 금일 날짜 기준 월요일 + 4일 = 금요일 찾기
    const currentDateFriday = dayjs(currentDateMonday).add(4,'day').format('YYYY-MM-DD');
    
    // 요청 날리기
    const response = await axios.get(`/api/menu/period?fromDate=${currentDateMonday}&toDate=${currentDateFriday}`)

    return response.data;
}
export const fetchTodayMeal = async () => {
    // 금일 날짜 확인(사용자 디바이스 기준)
    const currentDate = dayjs().format('YYYY-MM-DD');

    // 요청 날리기
    const response = await axios.get(`/api/menu/today?date=${currentDate}`);

    return response.data;
}
