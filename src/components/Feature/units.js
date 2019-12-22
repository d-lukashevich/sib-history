import css from '@emotion/css/macro';
import styled from '@emotion/styled/macro';
import colors from '../../colors';

import logo from '../../assets/img/vector-logo.svg';

const StyledTag = styled.span`
    font-size: 0.667em;
    font-weight: 600;
    line-height: normal;
    text-shadow: none;
    text-transform: uppercase;
    padding: 3px 4px;
    margin-right: 11px;
    margin-bottom: 8px;
    display: inline-block;
    background: ${colors.primary};
    transition: 1s all ease;
`;

const StyledTagLine = styled.div`
    line-height: 0.8;
`;

const StyledDetails = styled.div`
    padding: 0 16px ${({ double }) => (double ? 20 : 60)}px;
    border-left: 3px solid ${colors.primary};
    position: absolute;
    z-index: 2;
    left: 0;
    bottom: 0;
    margin-left: 52px;
    text-shadow: 1px 1px 2px #000;
    transition: 1s all ease;
    @media (max-width: 640px) {
        position: relative;
        padding-top: 20px;
        padding-bottom: 20px;
    }
    @media (max-width: 480px) {
        margin-left: 0;
        border: none;
    }
`;

const StyledDescription = styled.p`
    font-size: 0.888em;
    font-weight: 300;
    @media (max-width: 480px) {
        display: none;
    }
`;

const StyledHeading = styled.h2`
    font-size: 1.33em;
    font-weight: 600;
    line-height: 1.2em;
    margin: 0 auto 2px;
`;

const videoCss = css`
    &:after {
        content: '\\e800';
        font-family: 'fontello', sans-serif;
        font-style: normal;
        font-weight: normal;
        speak: none;
        position: absolute;
        z-index: 6;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: ${colors.primary};
        font-size: 6em;
        transition: 0.7s all ease;
        opacity: 0;
    }
    &:hover {
        &:after {
            opacity: 1;
        }
    }
`;

const StyledInner = styled.div`
    display: block;
    width: 100%;
    min-height: ${({ narrow }) => (narrow ? '400px' : '50vh')};
    ${({ narrow }) =>
        narrow &&
        css`
            @media (max-width: 520px) {
                min-height: 300px;
            }
        `};
    position: relative;
    color: #fff;
    transition: 1s all ease;
    text-decoration: none;
    ${({ img }) =>
        img
            ? css`
                background: url("${img}") no-repeat center center / cover;
              `
            : css`
                background: #000 url("${logo}") no-repeat unset center !important;
              `}
    &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 60%;
        background-image: linear-gradient(
            to bottom,
            rgba(18, 18, 26, 0) 0%,
            rgba(18, 18, 26, 0.5) 40%,
            rgba(18, 18, 26, 0.9) 100%
        );
    }
    ${({ href }) =>
        href &&
        css`
            &:hover {
                color: #fff;
                box-shadow: 0 0 40px ${colors.secondary} inset;
                ${StyledDetails} {
                    border-color: ${colors.secondary};
                }
                ${StyledTag} {
                    background-color: ${colors.secondary};
                }
            }
        `};
    ${({ video }) => video && videoCss};
    ${({ double }) =>
        double &&
        css`
            &:first-of-type {
                margin-right: 8px;
            }
        `};
    @media (max-width: 640px) {
        display: flex;
        align-items: flex-end;
        min-height: 350px;
    }
`;

const StyledFeature = styled.section`
    margin-bottom: 8px;
    &:first-of-type {
        @media (max-width: 480px) {
            min-height: 400px;
            padding-top: 100px;
            ${StyledHeading} {
                font-size: 1.33em;
            }
        }
        ${StyledInner} {
            ${({ narrow }) =>
                !narrow &&
                css`
                    min-height: 600px;
                `};
            @media (max-width: 480px) {
                min-height: 350px;
            }
        }
        ${StyledHeading} {
            font-size: 2.22em;
        }
    }
    &:nth-of-type(odd) {
        ${StyledInner} {
            background-attachment: fixed;
        }
    }
    @media (max-width: 1060px) {
        font-size: 0.92em;
    }
    ${({ double }) =>
        double &&
        css`
            display: flex;
            justify-content: space-between;
            @media screen and (max-width: 900px) {
                flex-direction: column;
            }
        `}
`;

export { StyledFeature, StyledInner, StyledHeading, StyledDescription, StyledDetails, StyledTagLine, StyledTag };
