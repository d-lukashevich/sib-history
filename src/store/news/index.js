import PropTypes from 'prop-types';
import { kea } from 'kea';

import { updateObject, sortData, selectVisibleItems } from '../utils';

const app = window.app;

export default kea({
    path: () => ['scenes', 'news'],

    actions: () => ({
        setInitiated: (bool) => bool,
        setLoading: (data) => data,
        setCurrentNews: (id) => id,
        setNewsData: (data) => data,
        setNewsSliderImages: (data) => data,
        setNewsPreviews: (object) => object,
        setVisibleCount: (number) => number
    }),

    reducers: ({ actions }) => ({
        isInitiated: [
            false,
            PropTypes.bool,
            {
                [actions.setInitiated]: (_, payload = true) => payload
            }
        ],
        isLoading: [
            false,
            PropTypes.bool,
            {
                [actions.setLoading]: (_, payload = true) => payload
            }
        ],
        currentNews: [
            null,
            PropTypes.number,
            {
                [actions.setCurrentNews]: (_, payload) => payload
            }
        ],
        newsData: [
            {},
            PropTypes.object,
            { persist: true },
            {
                [actions.setNewsData]: (state, payload) => updateObject(state, payload),
                [actions.setNewsSliderImages]: (state, payload) => ({
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
        newsPreviews: [
            {},
            PropTypes.object,
            {
                [actions.setNewsPreviews]: (state, payload) => ({
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
        sortedNews: [() => [selectors.newsData], sortData, PropTypes.arrayOf(PropTypes.object)],
        visibleSortedNews: [
            () => [selectors.sortedNews, selectors.visibleCount],
            selectVisibleItems,
            PropTypes.arrayOf(PropTypes.object)
        ],
        currentNewsData: [
            () => [selectors.newsData, selectors.currentNews],
            (newsData, currentNews) => (currentNews !== null ? newsData[currentNews] : {}),
            PropTypes.object
        ]
    }),
    thunks: ({ actions, get }) => ({
        getNewsPreviews: async (newsId, previewId) => {
            return window.app.storage
                .getURL(previewId, {
                    size: {
                        width: 375
                    }
                })
                .then((url) => actions.setNewsPreviews({ [newsId]: url }));
        },
        getPreviewsForVisibleSortedNews: async () => {
            actions.setLoading();

            try {
                const newsPreviews = get('newsPreviews');
                const promises = get('visibleSortedNews').map(
                    ({ id, preview } = {}) => id && !newsPreviews[id] && actions.getNewsPreviews(id, preview)
                );

                Promise.all(promises).then(() => actions.setLoading(false));
            } catch (e) {
                actions.setLoading(false);
            }
        },
        increaseVisibleCount: async (increaseCount) => {
            try {
                const count = get('visibleCount') + (typeof increaseCount !== 'number' ? 5 : increaseCount || 0);
                await actions.setVisibleCount(count);
                await actions.getPreviewsForVisibleSortedNews();
            } catch (e) {
                console.error(e);
            }
        },
        getNewsData: async () => {
            if (get('isInitiated')) return;
            actions.setLoading();

            await app.content
                .get('news', {
                    fields: ['id', 'title', 'preview', 'description', 'order'],
                    populate: ['preview']
                })
                .then((result) => {
                    Object.keys(result).forEach((key) => {
                        const [{ id } = {}] = result[key].preview || [];
                        result[key].preview = id;
                    });
                    actions.setNewsData(result);
                })
                .catch((e) => {
                    console.error(e);
                });

            actions.setInitiated();
            await actions.getPreviewsForVisibleSortedNews();
        },
        getNewsEntryData: async (id) => {
            actions.setLoading();

            await app.content
                .getByField('news', 'id', id, {
                    fields: ['title', 'imgSlider', 'videoSlider', 'article', 'banner', 'tag']
                })
                .then(async (result = {}) => {
                    const { banner: [bannerId] = [], imgSlider = [], ...restResult } = result[id] || {};
                    actions.setNewsData({ [id]: restResult });

                    let promises = [];
                    promises.push(
                        app.storage
                            .getURL(bannerId, {
                                size: {
                                    width: 'device'
                                }
                            })
                            .then((bannerUrl) => {
                                actions.setNewsData({ [id]: { banner: bannerUrl } });
                            })
                    );

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
                        promises.push(
                            Promise.all([img, sizedImg]).then((images) => {
                                actions.setNewsSliderImages({
                                    [id]: { [imgId]: { img: images[0], sizedImg: images[1] } }
                                });
                            })
                        );
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
