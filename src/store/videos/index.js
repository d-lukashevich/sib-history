import PropTypes from 'prop-types';
import { kea } from 'kea';

import { updateObject, sortData, selectVisibleItems } from '../utils';

const app = window.app;

export default kea({
    path: () => ['scenes', 'videos'],

    actions: () => ({
        setLoading: (data) => data,
        setVideosData: (data) => data,
        setVisibleCount: (number) => number,
        increaseVisibleCount: (number) => (typeof number !== 'number' ? 5 : number)
    }),

    reducers: ({ actions }) => ({
        isLoading: [
            false,
            PropTypes.bool,
            {
                [actions.setLoading]: (_, payload = true) => payload
            }
        ],
        videosData: [
            {},
            PropTypes.object,
            {
                [actions.setVideosData]: (state, payload) => updateObject(state, payload)
            }
        ],
        visibleCount: [
            5,
            PropTypes.number,
            {
                [actions.setVisibleCount]: (_, payload) => payload,
                [actions.increaseVisibleCount]: (state, payload) => state + payload
            }
        ]
    }),
    selectors: ({ selectors }) => ({
        sortedVideos: [() => [selectors.videosData], sortData, PropTypes.arrayOf(PropTypes.object)],
        visibleSortedVideos: [
            () => [selectors.sortedVideos, selectors.visibleCount],
            selectVisibleItems,
            PropTypes.arrayOf(PropTypes.object)
        ]
    }),
    thunks: ({ actions }) => ({
        getVideosData: async () => {
            actions.setLoading();

            await app.content
                .get('video', { fields: ['id', 'heading', 'description', 'videoLink', 'cover', 'order'] })
                .then(async (result) => {
                    const videosIds = Object.keys(result);
                    actions.setVideosData(
                        Object.assign(
                            ...videosIds.map((id) => {
                                const { cover, ...rest } = result[id];
                                return { [id]: rest };
                            })
                        )
                    );
                    let promises = [];
                    videosIds.forEach((id) => {
                        const { cover: [coverId] = [] } = result[id];
                        if (coverId !== undefined) {
                            promises.push(
                                app.storage
                                    .getURL(coverId, {
                                        size: {
                                            width: window.innerWidth > 880 ? 880 : window.innerWidth
                                        }
                                    })
                                    .then((cover) => actions.setVideosData({ [id]: { cover } }))
                            );
                        }
                    });
                    await Promise.all(promises);
                })
                .catch((e) => {
                    console.error(e);
                });

            actions.setLoading(false);
        }
    })
});
