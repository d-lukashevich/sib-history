import { resetContext, getContext } from 'kea';
import thunkPlugin from 'kea-thunk';
import localStoragePlugin from 'kea-localstorage';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import reduxReset from 'redux-reset';

const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;

const history = createBrowserHistory({ basename: PUBLIC_URL ? PUBLIC_URL : undefined });

resetContext({
    plugins: [thunkPlugin, localStoragePlugin],

    createStore: {
        middleware: [routerMiddleware(history)],
        reducers: {
            router: connectRouter(history)
        },
        enhancers: [reduxReset()]
    }
});

export default getContext().store;

export { history };
