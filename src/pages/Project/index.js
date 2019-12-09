import React, { useEffect } from 'react';
import { useActions, useValues } from 'kea';

import { createMarkup } from '../../utils';

import projectsLogic from '../../store/projects';

import { Helmet } from 'react-helmet/es/Helmet';
import config from '../../config';

const Project = ({ match: { params: { id } = {} } = {} }) => {
    const { currentProjectData: { title, article } = {} } = useValues(projectsLogic);
    const { getProjectData, setCurrentProject } = useActions(projectsLogic);

    useEffect(() => {
        const numId = Number(id);
        getProjectData(numId);
        setCurrentProject(numId);
    }, [getProjectData]);

    return (
        <>
            <Helmet>
                <title>{config.title + (title ? ` | Проект ${title}` : '')}</title>
            </Helmet>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={createMarkup(article)} />
        </>
    );
};

export default Project;
