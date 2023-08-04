import React from 'react';
import { styled } from 'styled-components';

const CustomHeaders = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #aaa;
`

const Header = () => {
    return (
        <CustomHeaders>
            뭔 ㅋㅋ
        </CustomHeaders>
    );
};

export default Header;