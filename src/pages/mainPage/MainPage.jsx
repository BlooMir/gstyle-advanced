import React from 'react';
import SurveyModal from '../../components/modal/combination/survey/SurveyModal';
import { useQueries } from 'react-query';
import { fetchMonthMeal, fetchWeekMeal, fetchTodayMeal} from '../../container/api/api';
import { useMenuStore } from '../../stores/menu/menu';
import WeekMealList from '../../components/weekMealList/WeekMealList';


const MainPage = () => {
    // Zustand set함수 호출
    const { setTodayMenu, setWeekMenu ,setMonthMenu } = useMenuStore();

    const queryResults = useQueries([
        {
            // 오늘의 메뉴 api 불러오기
            queryKey: 'TodayMealMenus',
            queryFn: fetchTodayMeal,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                // 오늘의 메뉴 set
                setTodayMenu(data);
            },
        },
        {
            // 주간의 메뉴 api 불러오기
            queryKey: 'WeekMealMenus',
            queryFn: fetchWeekMeal,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                // 해당 주의 메뉴 set
                setWeekMenu(data);
            },
        },
        {
            // 월간의 메뉴 api 불러오기
            queryKey: 'MonthMealMenus',
            queryFn: fetchMonthMeal,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                // 이번달의 메뉴 set
                setMonthMenu(data);
            },
        },
    ]);

    const [monthMealResult, weekMealResult] = queryResults;

    // 세상에서 제일 지루한 중학교는?
    if (monthMealResult.isLoading || weekMealResult.isLoading) return '로딩중';

    // 오류 발생 exception
    if (monthMealResult.isError || weekMealResult.isError) return `An error has occurred: ${monthMealResult.error?.message || weekMealResult.error?.message}`;

    return (
        <>
            <WeekMealList/>
            <SurveyModal/>
        </>
    );
};

export default MainPage;