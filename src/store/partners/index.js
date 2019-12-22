import PropTypes from 'prop-types';
import { kea } from 'kea';
import { updateObject } from '../utils';

const app = window.app;

export default kea({
    path: () => ['scenes', 'partners'],

    actions: () => ({
        setPartners: (data) => data
    }),

    reducers: ({ actions }) => ({
        partners: [
            {},
            PropTypes.object,
            {
                [actions.setPartners]: (state, payload) => updateObject(state, payload)
            }
        ]
    }),

    selectors: ({ selectors }) => ({
        partnersList: [
            () => [selectors.partners],
            (partners) => Object.keys(partners).map((id) => partners[id]),
            PropTypes.array
        ]
    }),

    thunks: ({ actions }) => ({
        getPartners: async () => {
            app.content
                .getByField('partners')
                .then(async (result = []) => {
                    Object.keys(result).forEach((id) => {
                        const { title, link, img: [imgId] = [] } = result[id];
                        app.storage
                            .getURL(imgId, {
                                size: {
                                    width: 375
                                }
                            })
                            .then((img) => actions.setPartners({ [id]: { img, title, link } }));
                    });
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    })
});
