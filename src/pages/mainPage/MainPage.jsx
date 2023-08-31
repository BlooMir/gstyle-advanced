import React from 'react';
import SurveyModal from '../../components/modal/combination/survey/SurveyModal';
import dayjs from "dayjs";
import { useQueries } from 'react-query';
import { fetchMonthMeal, fetchWeekMeal } from '../../container/api/api';
import { useMenuStore } from '../../stores/menu/menu';
import { styled } from 'styled-components';
import WeekMealList from '../../components/weekMealList/WeekMealList';

const MainPageDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`

const MainPage = () => {
    // 오늘 날짜 찾기
    const currentDate = dayjs().format(`YYYY-MM-DD`);

    // Zustand set함수 호출
    const { setTodayMenu, setThisWeekMenu ,setMonthMenu } = useMenuStore();

    const queryResults = useQueries([
        {
            queryKey: 'MonthMealMenus',
            queryFn: fetchMonthMeal,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                // 이번달의 메뉴 set
                setMonthMenu(data);
                console.log(data);
          
                // 오늘의 메뉴 찾기
                const todayIndex = data.findIndex((element) => element.lunchDate === currentDate);
                if (todayIndex !== -1) {
                  // 오늘의 메뉴 set
                  setTodayMenu(data[todayIndex]);
                  console.log(data[todayIndex]);
                }
              },
            },
        {
            queryKey: 'WeekMealMenus',
            queryFn: fetchWeekMeal,
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
            // 해당 주의 메뉴 set
            setThisWeekMenu(data);
            console.log(data);
            },
        }
    ]);
    const [monthMealResult, weekMealResult] = queryResults;

    if (monthMealResult.isLoading || weekMealResult.isLoading) return '로딩중';
    if (monthMealResult.isError || weekMealResult.isError) return `An error has occurred: ${monthMealResult.error?.message || weekMealResult.error?.message}`;

    // // React query로 값 불러오기 , onSuccess 콜백 함수 사용
    // const { isLoading, isError, error } = useQuery(`MonthMealMenus` , fetchMonthMeal, {
    //     refetchOnWindowFocus: false,
    //     onSuccess: (data) =>{
    //         // 오늘 날짜가 들어있는 배열값 index 찾기
    //         const todayIndex = data.findIndex((element) => element.lunchDate === currentDate);
    //         // 오늘의 메뉴 set
    //         setTodayMenu(data[todayIndex]);
    //         // 이번달의 메뉴 set
    //         setMonthMenu(data);
    //     }
    // });
    // if(isLoading) return `로딩중` // 서버 값 로딩 중 렌더링
    // if(isError) return `An error has occurred: ` + error.message // 에러뜨면

    
    return (
        <MainPageDiv>
            <WeekMealList/>
            <SurveyModal/>
        </MainPageDiv>
    );
};

export default MainPage;