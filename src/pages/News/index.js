import React, { useCallback, useEffect } from 'react';
import { useActions, useValues } from 'kea';

import { Main, Feature, Loader, ShowMore } from '../../components';

import { StyledList, ListItem } from './units';
import headerImg from './assets/img/news-header.jpg';

import newsLogic from '../../store/news';

const News = ({ newsPerLoad = 5 }) => {
    const { sortedNews, newsPreviews, visibleCount, isLoading } = useValues(newsLogic);
    const { getNewsData, getNewsPreviews, setVisibleCount } = useActions(newsLogic);

    const increaseVisibleCount = useCallback(() => {
        setVisibleCount(visibleCount + newsPerLoad);
    }, [visibleCount, newsPerLoad, setVisibleCount]);

    useEffect(() => {
        window.scrollTo(0, 0);
        getNewsData();
    }, [getNewsData]);

    useEffect(() => {
        sortedNews.slice(0, visibleCount + newsPerLoad).forEach(({ id, preview }) => {
            if (!newsPreviews[id]) getNewsPreviews(id, preview);
        });
        /* eslint-disable */
    }, [sortedNews, visibleCount, newsPerLoad, getNewsPreviews]);

    return (
        <>
            <Loader active={isLoading} full={!sortedNews.length} />
            <Feature {...{ img: headerImg, heading: 'Новости', narrow: true }} />
            <Main>
                <StyledList>
                    {sortedNews.slice(0, visibleCount).map(({ id, title, description }) => {
                        const image = newsPreviews[id];
                        return <ListItem {...{ id, title, description, image, key: id }} />;
                    })}
                </StyledList>
                <ShowMore {...{ increaseVisibleCount, list: sortedNews, visibleCount }} />
            </Main>
        </>
    );
};

export default News;
