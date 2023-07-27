import React from 'react';
import SurveyModal from '../../components/modal/combination/survey/SurveyModal';
import { useQuery } from 'react-query';
import { fetchTodayMeal } from '../../container/api/api';

const MainPage = () => {

    const todayMealMenus = useQuery(`todayMealMenus` , fetchTodayMeal);
    console.log(todayMealMenus.data);

    return (
        <>
            <SurveyModal/>
        </>
    );
};

export default MainPage;