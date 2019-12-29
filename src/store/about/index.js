import PropTypes from 'prop-types';
import { kea } from 'kea';

const app = window.app;

export default kea({
    path: () => ['scenes', 'about'],

    actions: () => ({
        setInitiated: (bool) => bool,
        setLoading: (data) => data,
        setAboutData: (data) => data
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
        aboutData: [
            {},
            PropTypes.object,
            {
                [actions.setAboutData]: (state, payload) => ({ ...state, ...payload })
            }
        ]
    }),
    thunks: ({ actions, get }) => ({
        getAboutData: async () => {
            if (get('isInitiated')) return;
            actions.setLoading();

            await app.content
                .get('about')
                .then(async ({ article, cover: [coverId] = [], title }) => {
                    actions.setAboutData({ article, title });
                    await app.storage
                        .getURL(coverId, {
                            size: {
                                width: 'device'
                            }
                        })
                        .then((cover) => actions.setAboutData({ cover }));
                })
                .catch((e) => {
                    console.error(e);
                });

            actions.setInitiated();
            actions.setLoading(false);
        }
    })
});
