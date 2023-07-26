import React from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../../recoil/atoms/States';
import { Button } from 'antd';

const ModalOpener = () => {
    const setIsOpen = useSetRecoilState(modalState);

    const openModal = () => {
        setIsOpen(true)
      };

    return (
        <>
            <Button type='primary' onClick={openModal}>
                프롭스 값?
            </Button>
        </>
    );
};

export default ModalOpener;