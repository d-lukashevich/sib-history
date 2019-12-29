import React, { useEffect } from 'react';
import { useActions, useValues } from 'kea';

import { Feature, Loader } from '../../components';
import { Wrapper } from './units';

import projectsLogic from '../../store/projects';
import videosLogic from '../../store/videos';

import { getVideoProps } from './utils';

const Main = () => {
    const { sortedProjects: projects = [], projectsPreviews, isLoading: projectsIsLoading } = useValues(projectsLogic);
    const { getProjectsData } = useActions(projectsLogic);

    const { sortedVideos: videos = [], isLoading: videosIsLoading } = useValues(videosLogic);
    const { getVideosData } = useActions(videosLogic);

    useEffect(() => {
        getProjectsData();
    }, [getProjectsData]);

    useEffect(() => {
        getVideosData();
    }, [getVideosData]);

    return (
        <Wrapper>
            <Loader active={projectsIsLoading || videosIsLoading} full={!projects.length || !videos.length} />
            {projects.slice(0, 3).map(({ id: key, title: heading, description }) => (
                <Feature
                    href={'projects/' + key}
                    {...{ heading, description, key, tag: 'Проект', img: projectsPreviews[key] }}
                />
            ))}
            {videos[0] && videos[1] && (
                <Feature {...{ ...getVideoProps(videos[0]), double: getVideoProps(videos[1]) }} />
            )}
        </Wrapper>
    );
};

export default Main;
