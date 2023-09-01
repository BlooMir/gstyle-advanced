import React from 'react';
import ModalOpener from '../../ModalOpener';
import { TODAY_SERVER_MODAL_TITLE } from '../../../../constants/constans';
import Survey from '../survey/elements/Survey';

const SurveyModal = () => {
    return (
        <>
            <ModalOpener btnTitle={TODAY_SERVER_MODAL_TITLE}/>
            <Survey/>
        </>
    );
};

export default SurveyModal;