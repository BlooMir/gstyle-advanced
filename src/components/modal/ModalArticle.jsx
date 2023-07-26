import { Modal } from 'antd';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from '../../recoil/atoms/States';

const ModalArticle = () => {
    const setIsOpen = useSetRecoilState(modalState);

    const onClose = () => {
        setIsOpen((prev) => {
            return { ...prev, isOpen: false}
        })
    }

    return (
        <>
            <Modal title="test" onCancel={onClose}>
                <p>someday..</p>
            </Modal>
        </>
    );
};

export default ModalArticle;