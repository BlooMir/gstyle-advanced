import React from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../recoil/atoms/States';
import { Modal } from 'antd';

const ModalArticle = () => {
    const [isOpen, setIsOpen] = useRecoilState(modalState);


    const closeModal = () => {
      setIsOpen(false)
    };

    return (
        <>
            <Modal title='test맨이야' open={isOpen} onOk={closeModal} onCancel={closeModal}>
                <p>sometime</p>
            </Modal>
        </>
    );
};

export default ModalArticle;