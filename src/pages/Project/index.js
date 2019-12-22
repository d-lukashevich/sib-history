import React, { useEffect } from 'react';
import { useActions, useValues } from 'kea';

import { Helmet } from 'react-helmet/es/Helmet';
import Lightbox from 'fslightbox-react';

import { Feature, Main, Article, Slider } from '../../components';

import { createMarkup, useLightboxController } from '../../utils';

import projectsLogic from '../../store/projects';

import config from '../../config';

const Project = ({ match: { params: { id } = {} } = {} }) => {
    const { currentProjectData: { title, article, banner, imgSlider = {}, videoSlider = [] } = {} } = useValues(
        projectsLogic
    );
    const { getProjectData, setCurrentProject } = useActions(projectsLogic);

    const [imgSliderState, openImgSlide] = useLightboxController();

    useEffect(() => {
        const numId = Number(id);
        getProjectData(numId);
        setCurrentProject(numId);
    }, [id, getProjectData, setCurrentProject]);

    const sliderImagesKeys = Object.keys(imgSlider);

    return (
        <>
            <Helmet>
                <title>{config.title + (title ? ` | Проект ${title}` : '')}</title>
            </Helmet>
            <Feature {...{ img: banner, heading: title, tag: 'Проект', narrow: true }} />
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
