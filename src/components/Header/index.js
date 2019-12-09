import React from 'react';

import { StyledHeader, Top, Logo, Menu, Contacts } from './units';

const Header = ({ position }) => (
    <StyledHeader {...{ position }}>
        <Top>
            <Logo />
            <Contacts />
        </Top>
        <Menu />
    </StyledHeader>
);

export default Header;
