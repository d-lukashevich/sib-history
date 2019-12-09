import React from 'react';
import { Global, css } from '@emotion/core';

export default () => (
    <Global
        styles={css`
            *,
            *:before,
            *:after {
                box-sizing: border-box;
            }
            html {
                height: 100%;
                font-size: 18px;
            }
            body {
                height: 100%;
                font-family: 'Open Sans', sans-serif;
                color: #181818;
                background: #ececec;
            }
            #root {
                min-height: 100%;
                position: relative;
                overflow: hidden;
            }
            img {
                max-width: 100%;
            }

            a {
                outline: none;
            }
        `}
    />
);
