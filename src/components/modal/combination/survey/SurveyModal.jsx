import React from 'react';
import ModalOpener from '../../ModalOpener';
import ModalArticle from '../../ModalArticle';
import { TODAY_SERVER_MODAL_TITLE } from '../../../../constants/constans';
import Survey from './Survey';

const SurveyModal = () => {

    return (
        <>
            <ModalOpener
                btnTitle={TODAY_SERVER_MODAL_TITLE}
            />
                <ModalArticle 
                    ModalTitle="temp"
                    ModalOk="제출하기"
                >
                    <Survey/>
                </ModalArticle>
        </>
    );
};

export default SurveyModal;