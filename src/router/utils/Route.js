import React from 'react';
import { Route as RouteOriginal } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { Header, Footer, SubWrapper } from '../../components';

const Route = ({ component: Component, headerPosition, title, ...restProps }) => (
    <RouteOriginal
        {...restProps}
        render={(props) => (
            <>
                <Helmet>
                    <title>Историческое общество Сибирского федерального округа {title ? ` | ${title}` : ''}</title>
                </Helmet>
                <SubWrapper>
                    <Header position={headerPosition} />
                    <Component {...props} />
                </SubWrapper>
                <Footer />
            </>
        )}
    />
);

export default Route;
