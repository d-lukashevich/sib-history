import React, { useReducer } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled/macro';
import isPropValid from '@emotion/is-prop-valid';
import colors from '../../../colors';

import { Link } from 'react-router-dom';

const StyledHeading = styled.h3`
    margin-top: 0;
    a {
        color: inherit;
        text-decoration: inherit;
    }
`;

const Button = styled.button`
    display: inline-block;
    padding: 0;
    border: none;
    background: ${colors.primary};
    border-radius: 8px;
    box-shadow: 2px 2px 3px #000;
    font-size: 0.85em;
    font-weight: 700;
    color: #fff;
    transition: 0.3s all ease;
    &:hover {
        transform: scale(1.1);
    }
    a {
        display: block;
        padding: 7px 10px;
        color: inherit;
        text-decoration: inherit;
    }
`;

const Image = styled.img`
    max-width: initial;
    min-width: 100%;
    min-height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Details = styled.div`
    padding: 17px 10px 17px 310px;
    background: #fff;
    transition: 0.7s all;
    overflow: hidden;
    text-overflow: ellipsis;
    @media (max-width: 899px) {
        padding: 17px 10px;
    }
`;

const Preview = styled('div', {
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'active'
})`
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ active }) => (!active ? '100%' : '300px')};
    height: 100%;
    background: ${colors.primary};
    overflow: hidden;
    transition: 0.7s all;
    cursor: pointer;
    @media (max-width: 899px) {
        max-height: 300px;
        ${({ active }) =>
            active &&
            css`
                width: 100%;
                left: auto;
                right: auto;
                top: -300px;
            `}
    }
`;

const Title = styled('div', {
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'active'
})`
    display: block;
    opacity: ${({ active }) => +!active};
    width: 100%;
    padding: 30px;
    position: absolute;
    z-index: 3;
    bottom: 0;
    left: 0;
    color: #fff;
    font-size: 1.7em;
    font-weight: bold;
    text-shadow: 1px 1px 2px #000;
    transition: 0.7s all;
    @media (max-width: 420px) {
        font-size: 1.2em;
    }
`;

const StyledLink = styled(Link, {
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'active'
})`
    display: ${({ active }) => (!active ? 'none' : 'block')};
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const StyledItem = styled('li', {
    shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'active'
})`
    display: block;
    margin-bottom: 20px;
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 3px 3px 5px #999;
    position: relative;
    &:nth-of-type(even) {
        ${Preview} {
            left: auto;
            right: 0;
        }
        ${Details} {
            @media (min-width: 900px) {
                padding: 17px 310px 17px 10px;
            }
        }
    }
    @media (max-width: 899px) {
        max-height: ${({ active }) => (!active ? '300px' : '100%')};
    }
`;

const activeReducer = (state, action) => (action === undefined ? true : action);
const ListItem = ({ id, image, title, description }) => {
    const [active, dispatchActive] = useReducer(activeReducer, false);
    const to = '/project/' + id;
    return (
        <StyledItem {...{ active }}>
            <Preview onClick={dispatchActive} {...{ active }}>
                <StyledLink {...{ active, to }} />
                <Image src={image} />
                <Title {...{ active }}>{title}</Title>
            </Preview>
            <Details>
                <StyledHeading>
                    <a {...{ to }}>{title}</a>
                </StyledHeading>
                <p>{description}</p>
                <Button>
                    <Link {...{ to }}>перейти</Link>
                </Button>
            </Details>
        </StyledItem>
    );
};

export default ListItem;
