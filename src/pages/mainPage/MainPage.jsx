import React from 'react';
import SurveyModal from '../../components/modal/combination/survey/SurveyModal';
import dayjs from "dayjs";
import { useQuery } from 'react-query';
import { fetchMonthMeal } from '../../container/api/api';
import { useMenuStore } from '../../stores/menu/menu';

const MainPage = () => {
    // 오늘 날짜 찾기
    // const currentDate = dayjs().format(`YYYY-MM-DD`);
    const dummyDate = dayjs('2023-05-10').format('YYYY-MM-DD');
 
    // Zustand set함수 호출
    const { setTodayMenu, setMonthMenu } = useMenuStore();

    // React query로 값 불러오기 , onSuccess 콜백 함수 사용
    const { isLoading, isError, error } = useQuery(`MonthMealMenus` , fetchMonthMeal, {
        refetchOnWindowFocus: false,

        onSuccess: (data) =>{
            // 오늘 날짜가 들어있는 배열값 index 찾기
            const todayIndex = data.findIndex((element) => element.lunchDate === dummyDate);
            // 오늘의 메뉴 set
            setTodayMenu(data[todayIndex]);
            // 이번달의 메뉴 set
            setMonthMenu(data);
        }
    });

    if(isLoading) return `로딩중` // 서버 값 로딩 중 렌더링
    if(isError) return `An error has occurred: ` + error.message // 에러뜨면

    
    return (
        <>
            <SurveyModal/>
        </>
    );
};

export default MainPage;