import React from 'react';
import headerImg from './assets/img/news-header.jpg';
import { Main, Feature, Loader } from '../../components';

const News = () => {
    return (
        <>
            <Loader active={false} full={false} />
            <Feature {...{ img: headerImg, heading: 'Новости', narrow: true }} />
            <Main>News</Main>
        </>
    );
};

export default News;
