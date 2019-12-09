import React, { useEffect } from 'react';
import { useActions, useValues } from 'kea';

import { Helmet } from 'react-helmet/es/Helmet';
import { Main } from '../../components';

import { createMarkup } from '../../utils';

import projectsLogic from '../../store/projects';

import config from '../../config';

const Project = ({ match: { params: { id } = {} } = {} }) => {
    const { currentProjectData: { title, article } = {} } = useValues(projectsLogic);
    const { getProjectData, setCurrentProject } = useActions(projectsLogic);

    useEffect(() => {
        const numId = Number(id);
        getProjectData(numId);
        setCurrentProject(numId);
    }, [id, getProjectData, setCurrentProject]);

    return (
        <Main>
            <Helmet>
                <title>{config.title + (title ? ` | Проект ${title}` : '')}</title>
            </Helmet>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={createMarkup(article)} />
        </Main>
    );
};

export default Project;
