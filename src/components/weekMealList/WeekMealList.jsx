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
const weekMenu = {
    Monday: null,
    Tuesday: null,
    Wednesday: null,
    Thursday: null,
    Friday: null,
  };

const WeekMealList = () => {
    // 주간 급식 정보 불러오기
    const { thisWeekMenu } = useMenuStore(); 
    // 오늘은 무슨 요일?
    const todayIs = dayjs().day() - 1 ;

    if (thisWeekMenu.length > 0) {
        thisWeekMenu.forEach((menuObj) => {
          // 각 요일의 lunchDate을 dayjs로 변환하여 요일을 얻음
          const dayOfWeek = dayjs(menuObj.lunchDate).day();
      
          // 요일에 따라 weekMenu 객체에 메뉴 정보를 할당
          switch (dayOfWeek) {
            case 1:
              weekMenu.Monday = menuObj.menus;
              break;
            case 2:
              weekMenu.Tuesday = menuObj.menus;
              break;
            case 3:
              weekMenu.Wednesday = menuObj.menus;
              break;
            case 4:
              weekMenu.Thursday = menuObj.menus;
              break;
            case 5:
              weekMenu.Friday = menuObj.menus;
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
                    {renderMenu(weekMenu.Monday)}
                </WeekMenuWrapper>

                <WeekMenuWrapper>
                    <h1>화요일</h1>
                    {renderMenu(weekMenu.Tuesday)}
                </WeekMenuWrapper>

                <WeekMenuWrapper>
                    <h1>수요일</h1>
                    {renderMenu(weekMenu.Wednesday)}
                </WeekMenuWrapper>

                <WeekMenuWrapper>
                    <h1>목요일</h1>
                    {renderMenu(weekMenu.Thursday)}
                </WeekMenuWrapper>

                <WeekMenuWrapper>
                    <h1>금요일</h1>
                    {renderMenu(weekMenu.Friday)}
                </WeekMenuWrapper>
            </Carousel>
    );
};

export default WeekMealList;