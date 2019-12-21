import PropTypes from 'prop-types';
import { kea } from 'kea';

const app = window.app;

export default kea({
    path: () => ['scenes', 'projects'],

    actions: () => ({
        setLoading: (data) => data,
        setCurrentProject: (id) => id,
        setProjectsData: (data) => data,
        setProjectSliderImages: (data) => data,
        setProjectPreview: (object) => object,
        setVisibleCount: (number) => number
    }),

    reducers: ({ actions }) => ({
        isLoading: [
            false,
            PropTypes.bool,
            {
                [actions.setLoading]: (_, payload = true) => payload
            }
        ],
        currentProject: [
            null,
            PropTypes.number,
            {
                [actions.setCurrentProject]: (_, payload) => payload
            }
        ],
        projectsData: [
            {},
            PropTypes.object,
            { persist: true },
            {
                [actions.setProjectsData]: (state, payload) => ({
                    ...state,
                    ...Object.assign(
                        ...Object.keys(payload).map((index) => ({ [index]: { ...state[index], ...payload[index] } }))
                    )
                }),
                [actions.setProjectSliderImages]: (state, payload) => ({
                    ...state,
                    ...Object.assign(
                        ...Object.keys(payload).map((index) => ({
                            [index]: {
                                ...state[index],
                                imgSlider: { ...(state[index].imgSlider || {}), ...payload[index] }
                            }
                        }))
                    )
                })
            }
        ],
        projectsPreviews: [
            {},
            PropTypes.object,
            {
                [actions.setProjectPreview]: (state, payload) => ({
                    ...state,
                    ...payload
                })
            }
        ],
        visibleCount: [
            5,
            PropTypes.number,
            {
                [actions.setVisibleCount]: (_, payload) => payload
            }
        ]
    }),
    selectors: ({ selectors }) => ({
        sortedProjects: [
            () => [selectors.projectsData],
            (projectsData) => {
                return Object.keys(projectsData)
                    .map((index) => projectsData[index])
                    .sort(({ order: orderA }, { order: orderB }) => {
                        if (orderA > orderB || orderA === undefined || orderB === undefined) return -1;
                        if (orderA < orderB) return 1;
                        return 0;
                    });
            },
            PropTypes.arrayOf(PropTypes.object)
        ],
        currentProjectData: [
            () => [selectors.projectsData, selectors.currentProject],
            (projectsData, currentProject) => (currentProject !== null ? projectsData[currentProject] : {}),
            PropTypes.object
        ]
    }),
    thunks: ({ actions }) => ({
        getProjectsData: async () => {
            actions.setLoading();

            await app.content
                .get('projects', {
                    fields: ['id', 'title', 'preview', 'description', 'order'],
                    populate: ['preview']
                })
                .then((result) => {
                    Object.keys(result).forEach((key) => {
                        const [{ id } = {}] = result[key].preview || [];
                        result[key].preview = id;
                    });
                    actions.setProjectsData(result);
                })
                .catch((e) => {
                    console.error(e);
                });

            actions.setLoading(false);
        },
        getProjectPreview: async (projectId, previewId) => {
            window.app.storage
                .getURL(previewId, {
                    size: {
                        width: window.innerWidth > 880 ? 880 : window.innerWidth
                    }
                })
                .then((url) => actions.setProjectPreview({ [projectId]: url }));
        },
        getProjectData: async (id) => {
            actions.setLoading();

            await app.content
                .getByField('projects', 'id', id, {
                    fields: ['title', 'imgSlider', 'videoSlider', 'article', 'banner']
                })
                .then(async (result = {}) => {
                    const { banner: [bannerId] = [], imgSlider = [], ...restResult } = result[id] || {};
                    actions.setProjectsData({ [id]: restResult });

                    app.storage
                        .getURL(bannerId, {
                            size: {
                                width: 'device'
                            }
                        })
                        .then((bannerUrl) => {
                            actions.setProjectsData({ [id]: { banner: bannerUrl } });
                        });

                    imgSlider.forEach((imgId) => {
                        const img = app.storage.getURL(imgId, {
                            size: {
                                width: 'device'
                            }
                        });
                        const sizedImg = app.storage.getURL(imgId, {
                            size: {
                                width: 300
                            }
                        });
                        Promise.all([img, sizedImg]).then((images) => {
                            actions.setProjectSliderImages({
                                [id]: { [imgId]: { img: images[0], sizedImg: images[1] } }
                            });
                        });
                    });
                })
                .catch((e) => {
                    console.error(e);
                });

            actions.setLoading(false);
        }
    })
});
