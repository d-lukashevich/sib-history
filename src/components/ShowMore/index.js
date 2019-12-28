import React from 'react';
import styled from '@emotion/styled';

import colors from '../../colors';

const StyledShowMore = styled.div`
    display: block;
    width: 60px;
    height: 60px;
    margin: 10px auto;
    border: 2px solid ${colors.primary};
    border-radius: 50%;
    position: relative;
    cursor: pointer;
    transition: transform 0.3s ease, border-color 0.3s ease;
    &:hover {
        transform: rotate(90deg);
        border-color: ${colors.secondary};
        &:before,
        &:after {
            background: ${colors.secondary};
        }
        &:before {
            height: 4px;
        }
        &:after {
            width: 4px;
        }
    }
    &:before,
    &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        background: ${colors.primary};
        transform: translate(-50%, -50%);
    }
    &:before {
        width: 50%;
        height: 2px;
        transition: height 0.3s ease, background-color 0.3s ease;
    }
    &:after {
        width: 2px;
        height: 50%;
        transition: width 0.3s ease, background-color 0.3s ease;
    }
`;

const ShowMore = ({ increaseVisibleCount, list, visibleCount, ...restProps }) => {
    if (visibleCount > list.length || !list.length) return null;
    return <StyledShowMore onClick={increaseVisibleCount} {...restProps} />;
};

export default ShowMore;
