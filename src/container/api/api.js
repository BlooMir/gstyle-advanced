import axios from "axios";
import dayjs from "dayjs";

export const fetchTodayMeal = async () => {
    // const currentDate = dayjs().format(`YYYYMMDD`);
    // const response = await axios.get(`/api/menu/today?${currentDate}`);

    const dummyDate = dayjs('2023-05-16');
    const formatDummyDate = dummyDate.format(`YYYYMMDD`);

    const response = await axios.get(`/api/menu/today?date=${formatDummyDate}`)
    return response.data;
}