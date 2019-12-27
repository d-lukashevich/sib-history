import PropTypes from 'prop-types';
import { kea } from 'kea';

import { updateObject } from '../utils';

const app = window.app;

export default kea({
    path: () => ['scenes', 'docs'],

    actions: () => ({
        setLoading: (data) => data,
        setDocsData: (data) => data,
        setDocsPreviews: (data) => data,
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
        docsData: [
            {},
            PropTypes.object,
            {
                [actions.setDocsData]: (state, payload) => updateObject(state, payload),
                [actions.setDocsPreviews]: (state, payload) => ({
                    ...state,
                    ...Object.assign(
                        ...Object.keys(payload).map((id) => ({
                            [id]: {
                                ...(state[id] || {}),
                                preview: {
                                    ...(state[id] && state[id].preview ? state[id].preview : {}),
                                    ...payload[id]
                                }
                            }
                        }))
                    )
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
        sortedDocs: [
            () => [selectors.docsData],
            (docsData) => {
                return Object.keys(docsData)
                    .map((index) => docsData[index])
                    .sort(({ order: orderA }, { order: orderB }) => {
                        if (orderA > orderB || orderA === undefined || orderB === undefined) return -1;
                        if (orderA < orderB) return 1;
                        return 0;
                    });
            },
            PropTypes.arrayOf(PropTypes.object)
        ],
        visibleSortedDocs: [
            () => [selectors.sortedDocs, selectors.visibleCount],
            (sortedDocs, visibleCount) => sortedDocs.slice(0, visibleCount),
            PropTypes.arrayOf(PropTypes.object)
        ]
    }),
    thunks: ({ actions, get }) => ({
        getDocPreview: async (docId, previewId) => {
            const previews = [];
            previews[0] = window.app.storage.getURL(previewId);
            previews[1] = window.app.storage.getURL(previewId, {
                size: {
                    width: window.innerWidth > 880 ? 880 : window.innerWidth
                }
            });
            return Promise.all(previews).then(([img, sizedImg]) =>
                actions.setDocsPreviews({ [docId]: { img, sizedImg } })
            );
        },
        getPreviewsForVisibleSortedDocs: async () => {
            actions.setLoading();

            const promises = get('visibleSortedDocs').map(
                ({ id: docId, preview: { id, img, sizedImg } = {} } = {}) =>
                    !img && !sizedImg && actions.getDocPreview(docId, id)
            );

            Promise.all(promises).then(() => actions.setLoading(false));
        },
        increaseVisibleCount: async (increaseCount) => {
            const count = get('visibleCount') + typeof increaseCount !== 'number' ? 5 : increaseCount || 0;
            await actions.setVisibleCount(count);
            await actions.getPreviewsForVisibleSortedDocs();
        },
        getDocsData: async () => {
            actions.setLoading();

            await app.content
                .get('docs', { fields: ['title', 'preview', 'video', 'fileLink', 'order'] })
                .then((result) => {
                    actions.setDocsData(
                        Object.assign(
                            ...Object.keys(result).map((id) => {
                                const { preview: [previewId] = [], ...rest } = result[id];
                                return { [id]: { ...rest, id, preview: previewId ? { id: previewId } : undefined } };
                            })
                        )
                    );
                })
                .catch((e) => {
                    console.error(e);
                });
            await actions.getPreviewsForVisibleSortedDocs();
        }
    })
});
