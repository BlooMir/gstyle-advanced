import axios from "axios";
import dayjs from "dayjs";

// 현재 날짜 기준 달의 모든 급식 데이터 불러오기
export const fetchMonthMeal = async () => {
    // 오늘 날짜 dayjs로 찾고 포맷 바꾸기
    // const currentDate = dayjs().format(`YYYY-MM-DD`);

    // 오늘 날짜 기준 월의 시작일 dayjs로 찾고 포맷 바꾸기
    // const currentDateMonthStart = dayjs(currentDate).startOf('month').format('YYYY-MM-DD');

    // 오늘 날짜 기준 월의 마지막일 dayjs로 찾고 포맷 바꾸기
    // const currentDateMonthEnd = dayjs(currentDate).endOf('month').format('YYYY-MM-DD');

    // const response = await axios.get(`/api/menu/period?fromDate=${currentDateMonthStart}&toDate=${currentDateMonthEnd}`)

    // 더미 날짜
    const dummyDate = dayjs('2023-05-10');
    const dummyDateMonthStart = dayjs(dummyDate).startOf('month').format('YYYY-MM-DD');
    const dummyDateMonthEnd = dayjs(dummyDate).endOf('month').format('YYYY-MM-DD');


    const response = await axios.get(`/api/menu/period?fromDate=${dummyDateMonthStart}&toDate=${dummyDateMonthEnd}`)
    
    return response.data;
}