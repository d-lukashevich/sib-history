import PropTypes from 'prop-types';
import { kea } from 'kea';

import { updateObject } from '../utils';

const app = window.app;

export default kea({
    path: () => ['scenes', 'news'],

    actions: () => ({
        setLoading: (data) => data,
        setCurrentNews: (id) => id,
        setNewsData: (data) => data,
        setNewsSliderImages: (data) => data,
        setNewsPreviews: (object) => object,
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
        sortedNews: [
            () => [selectors.newsData],
            (newsData) => {
                return Object.keys(newsData)
                    .map((index) => newsData[index])
                    .sort(({ order: orderA }, { order: orderB }) => {
                        if (orderA > orderB || orderA === undefined || orderB === undefined) return -1;
                        if (orderA < orderB) return 1;
                        return 0;
                    });
            },
            PropTypes.arrayOf(PropTypes.object)
        ],
        currentNewsData: [
            () => [selectors.newsData, selectors.currentNews],
            (newsData, currentNews) => (currentNews !== null ? newsData[currentNews] : {}),
            PropTypes.object
        ]
    }),
    thunks: ({ actions }) => ({
        getNewsData: async () => {
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

            actions.setLoading(false);
        },
        getNewsPreviews: async (newsId, previewId) => {
            window.app.storage
                .getURL(previewId, {
                    size: {
                        width: 375
                    }
                })
                .then((url) => actions.setNewsPreviews({ [newsId]: url }));
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

                    app.storage
                        .getURL(bannerId, {
                            size: {
                                width: 'device'
                            }
                        })
                        .then((bannerUrl) => {
                            actions.setNewsData({ [id]: { banner: bannerUrl } });
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
                            actions.setNewsSliderImages({
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
