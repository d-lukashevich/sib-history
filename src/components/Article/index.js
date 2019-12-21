import styled from '@emotion/styled';
import colors from '../../colors';

const Article = styled.article`
    h1,
    h2,
    h3 {
        margin-top: 40px;
        margin-bottom: 10px;
        line-height: 1.2em;
        font-size: 1.3em;
        font-weight: bold;
    }
    p {
        margin: 0;
        line-height: 1.6em;
        letter-spacing: 0.005em;
        word-spacing: 0.08em;
    }
    a {
        color: ${colors.primary};
        font-weight: 600;
        box-shadow: inset 0 -1px 0 0 ${colors.primary};
        transition: box-shadow 0.3s ease-out, color 0.2s ease-out;
        text-decoration: none;
        &:hover {
            color: #fff;
            box-shadow: inset 0 -24px 0 0 ${colors.primary};
        }
    }
    img {
        display: block;
        margin: 24px auto;
    }
`;

export default Article;
