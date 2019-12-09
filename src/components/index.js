import React from 'react';
import styled from '@emotion/styled';
import Header from './Header';

const Container = styled.div`
    max-width: ${({ maxWidth = 900 }) => maxWidth + 'px'};
    margin: 0 auto;
    padding: 0 10px;
`;

const StyledMain = styled.main`
    padding: 20px 0;
`;

const SubWrapper = styled.div`
    min-height: 100vh;
`;

const Main = ({ children }) => (
    <StyledMain>
        <Container>{children}</Container>
    </StyledMain>
);

export { Header, Container, Main, SubWrapper };
