import React, { useEffect } from 'react';

import { useActions, useValues } from 'kea';

import { Main, Feature, Loader, Article } from '../../components';

import { createMarkup } from '../../utils';

import aboutLogic from '../../store/about';

const About = () => {
    const {
        aboutData: { article, title, cover },
        isLoading
    } = useValues(aboutLogic);
    const { getAboutData } = useActions(aboutLogic);

    useEffect(() => {
        getAboutData();
    }, [getAboutData]);

    return (
        <>
            <Loader active={isLoading} full={!article && !title && !cover} />
            <Feature {...{ img: cover, heading: title, narrow: true }} />
            <Main>
                <Article>
                    <div dangerouslySetInnerHTML={createMarkup(article)} />
                </Article>
            </Main>
        </>
    );
};

export default About;
