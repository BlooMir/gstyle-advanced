import React from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/atoms/States';
import { Button } from 'antd';
import ModalArticle from './ModalArticle';


const SurveyModal = () => {
    const [isOpen, setIsOpen] = useRecoilState(modalState);

    const openModal = () => {
        setIsOpen((prev) => {
            return { ...prev, isOpen: true};
        });
    };



    return (
        <>
          <Button type='primary' onClick={openModal}>오늘의 급식 만족도 설문조사 하기</Button>
          {isOpen && <ModalArticle/>}
        </>
    );
};

export default SurveyModal;