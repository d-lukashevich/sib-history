import React, { useEffect } from 'react';
import { useActions, useValues } from 'kea';

import { Link } from 'react-router-dom';

import projectsLogic from '../../store/projects';

const Projects = () => {
    const { sortedProjects } = useValues(projectsLogic);
    const { getProjectsData } = useActions(projectsLogic);

    useEffect(() => {
        getProjectsData();
    }, [getProjectsData]);

    return (
        <>
            {sortedProjects.map(({ title, id, ...rest }, key) => {
                return <div key={key}>{<Link to={`/project/` + id}>{title}</Link>}</div>;
            })}
        </>
    );
};

export default Projects;
