import React from 'react';
import styles from '../../assets/css/survey.module.css'
import { Button } from 'antd';
import { useModalStore } from '../../stores/common/common';

const ModalOpener = ({btnTitle}) => {
    // zustand 모달 오픈 Boolean 값 set함수 (src -> stores -> common -> common.js)
    const { setIsOpen }  = useModalStore();

    // 모달 오픈 함수 (setIsOpen을 true로)
    const openModal = () => {
        setIsOpen(true)
      };

    return (
        <>
            <Button className={styles.surveyModalBtn} type='primary' onClick={openModal}>
                {btnTitle}
            </Button>
        </>
    );
};

export default ModalOpener;