import React, { useEffect, useCallback } from 'react';
import { useActions, useValues } from 'kea';

import { Main, ShowMore, Feature, Loader } from '../../components';
import headerImg from './assets/img/projects-header.jpg';

import { List, ListItem } from './units';

import projectsLogic from '../../store/projects';

const Projects = ({ projectsPerLoad = 5 }) => {
    const { sortedProjects, projectsPreviews, visibleCount, isLoading } = useValues(projectsLogic);
    const { getProjectsData, getProjectPreview, setVisibleCount } = useActions(projectsLogic);

    const increaseVisibleCount = useCallback(() => {
        setVisibleCount(visibleCount + projectsPerLoad);
    }, [visibleCount, projectsPerLoad, setVisibleCount]);

    useEffect(() => {
        getProjectsData();
    }, [getProjectsData]);

    useEffect(() => {
        sortedProjects.slice(0, visibleCount + projectsPerLoad).forEach(({ id, preview }) => {
            if (!projectsPreviews[id]) getProjectPreview(id, preview);
        });
        /* eslint-disable */
    }, [sortedProjects, visibleCount, projectsPerLoad, getProjectPreview]);

    return (
        <>
            <Loader active={isLoading} full={!sortedProjects.length} />
            <Feature {...{ img: headerImg, heading: 'Проекты', narrow: true }} />
            <Main>
                <List>
                    {sortedProjects.slice(0, visibleCount).map(({ id, title, description, preview = [] }, key) => {
                        const image = projectsPreviews[id];
                        return <ListItem {...{ id, title, image, description, key }} />;
                    })}
                </List>
                <ShowMore {...{ increaseVisibleCount, list: sortedProjects, visibleCount }} />
            </Main>
        </>
    );
};

export default Projects;
