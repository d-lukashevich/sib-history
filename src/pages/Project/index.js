import React, { useEffect } from 'react';
import { useActions, useValues } from 'kea';

import { Helmet } from 'react-helmet/es/Helmet';
import { Feature, Main, Article } from '../../components';

import { createMarkup } from '../../utils';

import projectsLogic from '../../store/projects';

import config from '../../config';

const Project = ({ match: { params: { id } = {} } = {} }) => {
    const { currentProjectData: { title, article, banner /*, imgSlider, videoSlider*/ } = {} } = useValues(
        projectsLogic
    );
    const { getProjectData, setCurrentProject } = useActions(projectsLogic);

    useEffect(() => {
        const numId = Number(id);
        getProjectData(numId);
        setCurrentProject(numId);
    }, [id, getProjectData, setCurrentProject]);

    return (
        <>
            <Helmet>
                <title>{config.title + (title ? ` | Проект ${title}` : '')}</title>
            </Helmet>
            <Feature {...{ img: banner, heading: title, tag: 'Проект', narrow: true }} />
            <Main>
                <Article>
                    <div dangerouslySetInnerHTML={createMarkup(article)} />
                </Article>
            </Main>
        </>
    );
};

export default Project;
