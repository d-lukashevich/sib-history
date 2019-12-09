import React from 'react';
import { Route as RouteOriginal } from "react-router-dom";
import { Helmet } from 'react-helmet';

const Route = ({ component: Component, title, ...restProps}) => (
    <RouteOriginal {...restProps} render={(props) => (
            <>
                <Helmet>
                    <title>Историческое общество Сибирского федерального округа {title ? ` | ${title}` : ''}</title>
                </Helmet>
                <Component {...props} />
            </>
        )}
    />
);

export default Route;
