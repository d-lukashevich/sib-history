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
    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 50%;
        height: 2px;
        background: ${colors.primary};
        transform: translate(-50%, -50%);
    }
    &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 2px;
        height: 50%;
        background: ${colors.primary};
        transform: translate(-50%, -50%);
    }
`;

const ShowMore = ({ increaseVisibleCount, list, visibleCount, ...restProps }) => {
    if (visibleCount > list.length || !list.length) return null;
    return <StyledShowMore onClick={increaseVisibleCount} {...restProps} />;
};

export default ShowMore;
