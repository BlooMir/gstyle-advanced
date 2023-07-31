import axios from "axios";
import dayjs from "dayjs";

// 현재 날짜 기준 달의 모든 급식 데이터 불러오기
export const fetchMonthMeal = async () => {
    // const currentDate = dayjs().format(`YYYY-MM-DD`);
    // const currentDateMonthStart = dayjs(currentDate).startOf('month').format('YYYY-MM-DD');
    // const currentDateMonthEnd = dayjs(currentDate).endOf('month').format('YYYY-MM-DD');

    const dummyDate = dayjs('2023-05-10');
    const dummyDateMonthStart = dayjs(dummyDate).startOf('month').format('YYYY-MM-DD');
    const dummyDateMonthEnd = dayjs(dummyDate).endOf('month').format('YYYY-MM-DD');

    const response = await axios.get(`/api/menu/period?fromDate=${dummyDateMonthStart}&toDate=${dummyDateMonthEnd}`)
    return response.data;
}