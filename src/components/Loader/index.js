import React from 'react';
import svg from './loading.svg';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';

const Wrapper = styled('div', {
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'active'
})`
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    bottom: ${({ full }) => (full ? 0 : 'initial')};
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 15px;
    color: #fff;
    transition: opacity 0.3s ease;
    background: rgba(0, 0, 0, ${({ full }) => (full ? '0.5' : '0.9')});
    opacity: ${({ active }) => +active};
    pointer-events: ${({ active }) => (active ? 'initial' : 'none')};
`;

const StyledImg = styled.img`
    display: block;
`;

const Loader = ({ active, full = true }) => (
    <Wrapper {...{ active, full }}>{full ? <StyledImg src={svg} alt={'Загрузка'} /> : 'Обновление информации'}</Wrapper>
);

export default Loader;
