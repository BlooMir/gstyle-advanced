import React from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/atoms/common/states';
import { Modal } from 'antd';

const ModalArticle = ({ModalTitle, ModalOk, children}) => {
    const [isOpen, setIsOpen] = useRecoilState(modalState);


    const closeModal = () => {
      setIsOpen(false)
    };

    return (
        <>
            <Modal 
                title={ModalTitle} 
                open={isOpen}
                maskClosable={false}
                okText={ModalOk}
                cancelText="취소"
                onOk={closeModal}
                onCancel={closeModal}
            >
                {children}
            </Modal>
        </>
    );
};

export default ModalArticle;