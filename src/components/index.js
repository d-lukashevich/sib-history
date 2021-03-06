import React from 'react';
import styled from '@emotion/styled';
import Container from './Container';
import ShowMore from './ShowMore';
import Feature from './Feature';
import Article from './Article';
import Slider from './Slider';
import Loader from './Loader';

import Header from './Header';
import Footer from './Footer';

const StyledMain = styled.main`
    padding: 20px 0;
`;

const SubWrapper = styled.div`
    min-height: 100vh;
    overflow: hidden;
`;

const Main = ({ children }) => (
    <StyledMain>
        <Container>{children}</Container>
    </StyledMain>
);

export { Header, Footer, Container, Main, SubWrapper, ShowMore, Feature, Article, Slider, Loader };
