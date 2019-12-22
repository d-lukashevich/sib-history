import React from 'react';
import styled from '@emotion/styled';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import SlickSlider from 'react-slick';

import configs from './configs';
import colors from '../../colors';

const StyledSlider = styled(SlickSlider)`
    padding: 18px 0;
    ${({ preset }) => configs[preset].css};
    .slick-prev,
    .slick-next {
        width: 34px;
        height: 34px;
        &:before {
            font-size: 34px;
            color: ${colors.primary};
        }
    }
    .slick-dots li button:before {
        font-size: 15px;
    }
    .slick-dots li button:before {
        color: ${colors.primary};
    }
    .slick-dots li.slick-active button:before {
        color: lighten(${colors.primary}, 10);
    }
    .slick-slide:focus {
        outline: none;
    }
`;

const Slider = ({ preset, children, ...restProps }) => {
    return <StyledSlider {...{ children, preset, ...configs[preset].settings, ...restProps }} />;
};

export default Slider;
