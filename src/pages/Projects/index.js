import React, { useEffect, useCallback } from 'react';
import { useActions, useValues } from 'kea';

import { Link } from 'react-router-dom';

import { Main, ShowMore } from '../../components';

import projectsLogic from '../../store/projects';

const Projects = ({ projectsPerLoad = 5 }) => {
    const { sortedProjects, visibleCount } = useValues(projectsLogic);
    const { getProjectsData, setVisibleCount } = useActions(projectsLogic);

    const increaseVisibleCount = useCallback(() => {
        setVisibleCount(visibleCount + projectsPerLoad);
    }, [visibleCount, projectsPerLoad, setVisibleCount]);

    useEffect(() => {
        getProjectsData();
    }, [getProjectsData]);

    return (
        <Main>
            {sortedProjects.slice(0, visibleCount).map(({ title, id, ...rest }, key) => {
                return <div key={key}>{<Link to={`/project/` + id}>{title}</Link>}</div>;
            })}
            <ShowMore {...{ increaseVisibleCount, list: sortedProjects, visibleCount }} />
        </Main>
    );
};

export default Projects;
