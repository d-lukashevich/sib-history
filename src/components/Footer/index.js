import React from 'react';
import styled from '@emotion/styled';

import Container from '../Container';

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

const Footer = ({ partners = [] }) => (
    <StyledFooter>
        {!partners.length ? null : (
            <Container maxWidth={1200}>
                <Heading>Наши партнеры</Heading>
            </Container>
        )}
        <Copyright>
            {new Date().getFullYear()} &copy; Отделение Российского исторического общества в Сибирском федеральном
            округе
        </Copyright>
    </StyledFooter>
);

export default Footer;
