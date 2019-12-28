import React, { useEffect } from 'react';
import { useActions, useValues } from 'kea';

import { Main, ShowMore, Feature, Loader } from '../../components';
import headerImg from './assets/img/projects-header.jpg';

import { List, ListItem } from './units';

import projectsLogic from '../../store/projects';

const Projects = () => {
    const { sortedProjects, visibleSortedProjects, projectsPreviews, visibleCount, isLoading } = useValues(
        projectsLogic
    );
    const { getProjectsData, increaseVisibleCount } = useActions(projectsLogic);

    useEffect(() => {
        getProjectsData();
    }, [getProjectsData]);

    return (
        <>
            <Loader active={isLoading} full={!visibleSortedProjects.length} />
            <Feature {...{ img: headerImg, heading: 'Проекты', narrow: true }} />
            <Main>
                <List>
                    {visibleSortedProjects.map(({ id, title, description, preview = [] }, key) => (
                        <ListItem {...{ id, title, image: projectsPreviews[id], description, key }} />
                    ))}
                </List>
                <ShowMore {...{ increaseVisibleCount, list: sortedProjects, visibleCount }} />
            </Main>
        </>
    );
};

export default Projects;
