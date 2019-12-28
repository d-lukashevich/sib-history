import React, { useEffect } from 'react';

import { useActions, useValues } from 'kea';
import videosLogic from '../../store/videos';

import headerImg from './assets/img/video-header.jpg';
import { Main, ShowMore, Loader, Feature } from '../../components';
import { StyledFeature } from './units';

const Videos = () => {
    const { visibleSortedVideos = [], sortedVideos = [], isLoading, visibleCount } = useValues(videosLogic);
    const { getVideosData, increaseVisibleCount } = useActions(videosLogic);

    useEffect(() => {
        getVideosData();
    }, [getVideosData]);

    return (
        <>
            <Loader active={isLoading} full={!sortedVideos.length} />
            <Feature {...{ img: headerImg, heading: 'Видео', narrow: true }} />
            <Main>
                {visibleSortedVideos.map(({ id: key, cover: img, videoLink: href, description, heading }) => (
                    <StyledFeature
                        {...{ key, img, href: `https://youtu.be/${href}`, description, heading, narrow: !img }}
                        {...{ video: true, fixedBg: false, tag: 'Видео' }}
                    />
                ))}
                <ShowMore {...{ increaseVisibleCount, list: sortedVideos, visibleCount }} />
            </Main>
        </>
    );
};

export default Videos;
