import PropTypes from 'prop-types';
import { kea } from 'kea';

const app = window.app;

export default kea({
    path: () => ['scenes', 'about'],

    actions: () => ({
        setLoading: (data) => data,
        setAboutData: (data) => data
    }),

    reducers: ({ actions }) => ({
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
    thunks: ({ actions }) => ({
        getAboutData: async () => {
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

            actions.setLoading(false);
        }
    })
});
