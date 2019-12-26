import React from 'react';
import styled from '@emotion/styled/macro';
import colors from '../../colors';

import { createMarkup } from '../../utils';

import { Link } from 'react-router-dom';

const StyledList = styled.ul`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
`;

const StyledListItem = styled.li`
    display: flex;
    align-items: flex-start;
    list-style: none;
    margin-bottom: 25px;
    font-size: 0.8em;
    @media (max-width: 640px) {
        flex-flow: column;
    }
`;

const ImageWrapper = styled.div`
    max-width: 300px;
    min-width: 300px;
    margin-right: 15px;

    a {
        display: block;
        width: 100%;
        height: 100%;
        background: ${colors.primary};
    }

    img {
        display: block;
        margin: 0 auto;
    }

    @media (max-width: 640px) {
        max-width: initial;
        margin-right: 0;
        margin-bottom: 15px;
    }
`;

const ItemHeading = styled.h2`
    margin-top: 0;
    a {
        color: inherit;
        text-decoration: inherit;
    }
`;

const ItemDescription = styled.div`
    margin-bottom: 0;
    p {
        margin: 0 0 5px;
    }
`;

const ListItem = ({ id, image, description, title }) => {
    const to = '/news/' + id;
    return (
        <StyledListItem>
            <ImageWrapper>
                <Link {...{ to }}>{image && <img src={image} alt={''} />}</Link>
            </ImageWrapper>
            <div>
                <ItemHeading>
                    <Link {...{ to }}>{title}</Link>
                </ItemHeading>
                <ItemDescription dangerouslySetInnerHTML={createMarkup(description)} />
            </div>
        </StyledListItem>
    );
};

export { StyledList, ListItem };
