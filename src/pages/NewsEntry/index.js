import React, { useEffect, useMemo } from 'react';
import { useActions, useValues } from 'kea';

import { Helmet } from 'react-helmet/es/Helmet';
import Lightbox from 'fslightbox-react';

import { Feature, Main, Article, Slider, Loader } from '../../components';

import { createMarkup, useLightboxController } from '../../utils';

import newsLogic from '../../store/news';

import config from '../../config';

const Project = ({ match: { params: { id } = {} } = {} }) => {
    const {
        isLoading,
        currentNewsData: { title, article, banner, imgSlider = {}, videoSlider = [], tag } = {}
    } = useValues(newsLogic);
    const { getNewsEntryData, setCurrentNews } = useActions(newsLogic);

    const [imgSliderState, openImgSlide] = useLightboxController();

    useEffect(() => {
        const numId = Number(id);
        getNewsEntryData(numId);
        setCurrentNews(numId);
    }, [id, getNewsEntryData, setCurrentNews]);

    const sliderImagesKeys = Object.keys(imgSlider);

    const fullLoading = useMemo(() => {
        return !banner && !article;
        /* eslint-disable */
    }, [isLoading]);

    return (
        <>
            <Helmet>
                <title>{config.title + (title ? ` | ${title}` : '')}</title>
            </Helmet>
            <Loader active={isLoading} full={fullLoading} />
            <Feature {...{ img: banner, heading: title, tag, narrow: true }} />
            <Main>
                <Article>
                    <div dangerouslySetInnerHTML={createMarkup(article)} />
                    <div>
                        <Lightbox
                            key={sliderImagesKeys}
                            type={'image'}
                            {...imgSliderState}
                            sources={sliderImagesKeys.map((index) => imgSlider[index].img)}
                        />
                        <Slider preset={'images'}>
                            {sliderImagesKeys.map((id) => {
                                const { img, sizedImg } = imgSlider[id];
                                return (
                                    <a href={img} key={id} onClick={(e) => openImgSlide(img, e)}>
                                        <img src={sizedImg} alt={''} />
                                    </a>
                                );
                            })}
                        </Slider>
                        <Slider preset={'video'}>
                            {videoSlider.map(({ uniqueKey, videoLink }) => (
                                <li key={videoLink}>
                                    <iframe
                                        title={uniqueKey}
                                        src={'https://www.youtube.com/embed/' + videoLink}
                                        frameBorder={0}
                                        allow={'encrypted-media'}
                                        allowFullScreen={true}
                                    />
                                </li>
                            ))}
                        </Slider>
                    </div>
                </Article>
            </Main>
        </>
    );
};

export default Project;
