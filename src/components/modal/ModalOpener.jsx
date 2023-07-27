import React from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../../recoil/atoms/common/states';
import { Button } from 'antd';

const ModalOpener = (props) => {
    const setIsOpen = useSetRecoilState(modalState);

    const openModal = () => {
        setIsOpen(true)
      };

    return (
        <>
            <Button type='primary' onClick={openModal}>
                {props.btnTitle}
            </Button>
        </>
    );
};

export default ModalOpener;