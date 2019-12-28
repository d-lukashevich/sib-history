import React, { useEffect } from 'react';
import { useActions, useValues } from 'kea';

import { StyledHeader, Top, Logo, Menu, Contacts, Specials } from './units';
import specialsLogic from '../../store/specials';

const Header = ({ position }) => {
    const { specialsData } = useValues(specialsLogic);
    const { getSpecialsData } = useActions(specialsLogic);

    useEffect(() => {
        getSpecialsData();
    }, [getSpecialsData]);

    return (
        <StyledHeader {...{ position }}>
            <Top>
                <Logo />
                <Specials data={specialsData} />
                <Contacts />
            </Top>
            <Menu />
        </StyledHeader>
    );
};

export default Header;
