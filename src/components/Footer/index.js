import React, { useEffect } from 'react';
import styled from '@emotion/styled';

import { useActions, useValues } from 'kea';

import partnersLogic from '../../store/partners';

import Container from '../Container';
import { Slider } from '../../components';

const StyledFooter = styled.footer`
    padding: 10px 0;
    background: #f5f5f5;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
`;

const Heading = styled.h3`
    margin-top: 0;
    color: #000;
`;

const Copyright = styled.div`
    width: 100%;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    font-size: 0.611em;
    text-align: center;
`;

const StyledPartner = styled.li`
    width: 33.3333%;
    margin: 0 10px;
    transition: 0.3s all ease;
    &:hover {
        filter: unset;
    }
    a {
        display: flex;
        min-height: 100px;
        align-items: center;
    }
    img {
        display: block;
        max-height: 100px;
        margin: 0 auto;
    }
`;

const Footer = (props) => {
    const { partnersList } = useValues(partnersLogic);
    const { getPartners } = useActions(partnersLogic);

    useEffect(() => {
        getPartners();
    }, [getPartners]);

    return (
        <StyledFooter {...props}>
            {!partnersList.length ? null : (
                <Container maxWidth={1200}>
                    <Heading>Наши партнеры</Heading>
                    <Slider preset={'partners'}>
                        {partnersList.map(({ link: href, img, title }) => (
                            <StyledPartner key={img}>
                                <a {...{ href, title, target: '_blank' }}>
                                    <img src={img} alt={title} />
                                </a>
                            </StyledPartner>
                        ))}
                    </Slider>
                </Container>
            )}
            <Copyright>
                {new Date().getFullYear()} &copy; Отделение Российского исторического общества в Сибирском федеральном
                округе
            </Copyright>
        </StyledFooter>
    );
};

export default Footer;
