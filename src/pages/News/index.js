import React, { useEffect } from 'react';
import { useActions, useValues } from 'kea';

import { Main, Feature, Loader, ShowMore } from '../../components';

import { StyledList, ListItem } from './units';
import headerImg from './assets/img/news-header.jpg';

import newsLogic from '../../store/news';

const News = () => {
    const { sortedNews = [], visibleSortedNews = [], newsPreviews, visibleCount, isLoading } = useValues(newsLogic);
    const { getNewsData, increaseVisibleCount } = useActions(newsLogic);

    useEffect(() => {
        getNewsData();
    }, [getNewsData]);

    return (
        <>
            <Loader active={isLoading} full={!sortedNews.length} />
            <Feature {...{ img: headerImg, heading: 'Новости', narrow: true }} />
            <Main>
                <StyledList>
                    {visibleSortedNews.map(({ id, title, description }) => (
                        <ListItem {...{ id, title, description, image: newsPreviews[id], key: id }} />
                    ))}
                </StyledList>
                <ShowMore {...{ increaseVisibleCount, list: sortedNews, visibleCount }} />
            </Main>
        </>
    );
};

export default News;
