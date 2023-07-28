import React from 'react';
import SurveyModal from '../../components/modal/combination/survey/SurveyModal';
import { useQuery } from 'react-query';
import { fetchTodayMeal } from '../../container/api/api';
import { useSetRecoilState } from 'recoil';
import { todayMenuState } from '../../recoil/atoms/common/states';

const MainPage = () => {
    // 오늘 메뉴 Recoil에 set하기 (common - states.js)
    const setMenus = useSetRecoilState(todayMenuState);
    // React query로 값 불러오기 , onSuccess 콜백 함수 사용으로 바로 set(useEffect없이)
    const { isLoading, isError, error, data } = useQuery(`todayMealMenus` , fetchTodayMeal, {
        onSuccess: (data) =>{
            setMenus(data.menus);
        },
    });

    if(isLoading) return `Loading...` // 로딩 때
    if(data.menus == null) return '급식 자료가 없습니다' // 서버 리턴값으로 null오면
    if(isError) return `An error has occurred:` + error.message // 에러뜨면



    return (
        <>
            <SurveyModal/>
        </>
    );
};

export default MainPage;