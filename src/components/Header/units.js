import React, { useState, useRef, useCallback } from 'react';
import styled from '@emotion/styled';

import { Link } from 'react-router-dom';

import logoLink from '../../assets/img/logo.png';

const MAP_POINT =
    'https://www.google.ru/maps/place/%D1%83%D0%BB.+%D0%9E%D1%80%D0%B4%D0%B6%D0%BE%D0%BD%D0%B8%D0%BA%D0%B8%D0%B4%D0%B7%D0%B5,+38,+%D0%9D%D0%BE%D0%B2%D0%BE%D1%81%D0%B8%D0%B1%D0%B8%D1%80%D1%81%D0%BA,+%D0%9D%D0%BE%D0%B2%D0%BE%D1%81%D0%B8%D0%B1%D0%B8%D1%80%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB.,+630099/@55.0322419,82.9332299,16.5z/data=!4m5!3m4!1s0x42dfe5dd3526c189:0x6fedcbcc9e5d678f!8m2!3d55.032142!4d82.935984';

const StyledHeader = styled.header`
    padding: 10px 20px;
    position: ${({ position = 'fixed' }) => position};
    top: 0;
    left: 0;
    z-index: 20;
    width: 100%;
    background: rgba(56, 0, 9, 0.95);
    box-shadow: 0 5px 25px #000;
    @media (max-width: 480px) {
        padding: 10px;
    }
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledLogo = styled(Link)`
    display: inline-flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
`;

const StyledLogoImg = styled.img`
    max-width: 70px;
    margin-right: 10px;
`;

const StyledLogoText = styled.span`
    text-align: center;
    max-width: 315px;
    @media (max-width: 600px) {
        font-size: 0.7em;
    }
`;

const Logo = () => (
    <StyledLogo to={'/'}>
        <StyledLogoImg src={logoLink} alt={'Логотип Общества'} />
        <StyledLogoText>АНО "Историческое общество Сибирского федерального округа"</StyledLogoText>
    </StyledLogo>
);

const StyledMenu = styled.nav``;

const MenuIcon = styled.div`
    display: none;
    color: #fff;
    @media (max-width: 600px) {
        display: inline-block;
        margin-top: 8px;
        text-transform: uppercase;
    }
`;

const MenuList = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    transition: height 0.3s ease;
    @media (max-width: 600px) {
        height: ${({ height }) => height + 'px'};
    }
    @media (min-width: 601px) {
        height: auto !important;
    }
`;

const StyledMenuItem = styled.li`
    display: inline-block;
    vertical-align: middle;
    padding: 8px 10px;
    font-weight: bold;
    text-transform: uppercase;
    &:first-of-type {
        padding-left: 0;
    }
    &:last-of-type {
        padding-right: 0;
    }
    @media (max-width: 600px) {
        display: block;
        text-align: center;
    }
`;

const MenuItemLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    transition: 0.3s all ease;
    &:hover {
        color: rgba(255, 255, 255, 0.8);
    }
`;

const MenuItem = ({ children, to }) => (
    <StyledMenuItem>
        <MenuItemLink {...{ children, to }} />
    </StyledMenuItem>
);

const Menu = () => {
    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    const switchHeight = useCallback(
        () => setHeight((prevState) => (prevState === 0 ? ref.current['scrollHeight'] : 0)),
        []
    );

    return (
        <StyledMenu>
            <MenuIcon className="icon-menu" onClick={switchHeight}>
                меню
            </MenuIcon>
            <MenuList {...{ ref, height }}>
                <MenuItem to={'/about'}>О нас</MenuItem>
                <MenuItem to={'/news'}>Новости</MenuItem>
                <MenuItem to={'/projects'}>Проекты</MenuItem>
                <MenuItem to={'/video'}>Видео</MenuItem>
                <MenuItem to={'/docs'}>Документы</MenuItem>
            </MenuList>
        </StyledMenu>
    );
};

const StyledContacts = styled.div`
    text-align: right;
    font-size: 0.7em;
    color: #fff;
    a {
        color: inherit;
        text-decoration: inherit;
    }
    @media (max-width: 520px) {
        display: none;
    }
`;

const ContactsItem = styled.span`
    display: inline-block;
`;

const Contacts = () => (
    <StyledContacts>
        <a href={MAP_POINT} target={'_blank'} rel={'noopener noreferrer'}>
            <ContactsItem>РОССИЯ, 630099,</ContactsItem>
            <ContactsItem>г. Новосибирск,</ContactsItem>
            <ContactsItem>ул. Орджоникидзе, 38,</ContactsItem>
            <ContactsItem>офис 703</ContactsItem>
        </a>
        <div>
            <ContactsItem>
                тел. <a href="tel:+73833637606">363-76-06</a>
            </ContactsItem>{' '}
            <ContactsItem>
                факс <a href="tel:+73833637607">8(383) 363-76-07</a>
            </ContactsItem>
        </div>
        <div>
            <a href="mailto:ekaterinavboldyreva@yandex.ru">e-mail: ekaterinavboldyreva@yandex.ru</a>
        </div>
        <div>
            <a href="mailto:Bestler@mail.ru">e-mail: Bestler@mail.ru</a>
        </div>
    </StyledContacts>
);

export { StyledHeader, Top, Logo, Menu, Contacts };
