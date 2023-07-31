import React from 'react';
import { Modal } from 'antd';
import { useModalStore } from '../../stores/common/common';

const ModalArticle = ({ModalTitle, ModalOk, children}) => {
    const { isOpen, setIsOpen } = useModalStore();


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