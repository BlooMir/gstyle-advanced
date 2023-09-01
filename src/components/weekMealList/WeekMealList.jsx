import { Carousel } from 'antd';
import React from 'react';
import { useMenuStore } from '../../stores/menu/menu';
import dayjs from "dayjs";
import { styled } from 'styled-components';

const WeekMenuWrapper = styled.div`
    font-weight: 700;
    padding-top: 10px;
    height: 300px;
    text-align: center;

    h1{
        font-size: 25px;
        margin-bottom: 10px;
    }
    .renderMenu{
        font-size: 15px;
    }
`
const thisWeekMenu = {
    Monday: null,
    Tuesday: null,
    Wednesday: null,
    Thursday: null,
    Friday: null,
  };

const WeekMealList = () => {
    // 주간 급식 정보 불러오기
    const { weekMenu } = useMenuStore(); 
    // 오늘은 무슨 요일?
    const todayIs = dayjs().day() - 1 ;

    if (weekMenu.length > 0) {
        weekMenu.forEach((menuObj) => {
          // 각 요일의 lunchDate을 dayjs로 변환하여 요일을 얻음
          const dayOfWeek = dayjs(menuObj.lunchDate).day();
      
          // 요일에 따라 weekMenu 객체에 메뉴 정보를 할당
          switch (dayOfWeek) {
            case 1:
              thisWeekMenu.Monday = menuObj.menus;
              break;
            case 2:
              thisWeekMenu.Tuesday = menuObj.menus;
              break;
            case 3:
              thisWeekMenu.Wednesday = menuObj.menus;
              break;
            case 4:
              thisWeekMenu.Thursday = menuObj.menus;
              break;
            case 5:
              thisWeekMenu.Friday = menuObj.menus;
              break;
            default:
              break;
          }
        });
    }
    const renderMenu = (menuArray) => {
        if (!menuArray) return <div className='renderMenu'>메뉴 정보 없음</div>; // null이나 undefined 처리
        return menuArray.map((item, index) => {
            return <div className='renderMenu' key={index}>{item}</div>;
        });
      };
      
    return (
            <Carousel draggable dots={false} initialSlide={todayIs}>
                <WeekMenuWrapper>
                    <h1>월요일</h1>
                    {renderMenu(thisWeekMenu.Monday)}
                </WeekMenuWrapper>

                <WeekMenuWrapper>
                    <h1>화요일</h1>
                    {renderMenu(thisWeekMenu.Tuesday)}
                </WeekMenuWrapper>

                <WeekMenuWrapper>
                    <h1>수요일</h1>
                    {renderMenu(thisWeekMenu.Wednesday)}
                </WeekMenuWrapper>

                <WeekMenuWrapper>
                    <h1>목요일</h1>
                    {renderMenu(thisWeekMenu.Thursday)}
                </WeekMenuWrapper>

                <WeekMenuWrapper>
                    <h1>금요일</h1>
                    {renderMenu(thisWeekMenu.Friday)}
                </WeekMenuWrapper>
            </Carousel>
    );
};

export default WeekMealList;