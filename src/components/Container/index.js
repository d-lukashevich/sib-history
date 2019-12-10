import styled from '@emotion/styled';

const Container = styled.div`
    max-width: ${({ maxWidth = 900 }) => maxWidth + 'px'};
    margin: 0 auto;
    padding: 0 10px;
`;

export default Container;
