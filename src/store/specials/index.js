import PropTypes from 'prop-types';
import { kea } from 'kea';

const app = window.app;

export default kea({
    path: () => ['scenes', 'specials'],
    actions: () => ({
        setSpecialsData: (data) => data
    }),
    reducers: ({ actions }) => ({
        specialsData: [
            {},
            PropTypes.object,
            {
                [actions.setSpecialsData]: (state, payload) => ({ ...state, ...payload })
            }
        ]
    }),
    thunks: ({ actions }) => ({
        getSpecialsData: async () => {
            await app.content
                .get('special', { fields: ['title', 'preview', 'link'] })
                .then(async (result) => {
                    Object.keys(result).forEach((id) => {
                        const { preview: [previewId] = [], ...rest } = result[id];
                        app.storage
                            .getURL(previewId, {
                                size: {
                                    width: 110
                                }
                            })
                            .then((preview) => actions.setSpecialsData({ [id]: { preview, ...rest } }));
                    });
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    })
});
