import { combineReducers, createStore } from 'redux'
import * as thunk from 'redux-thunk'

import { applyMiddleware, utils } from 'redux-tiny-router'

import { RequestGridReducer } from './Grid/Reducer'

utils.setRoutes([
    '/board/:GridUrlConstructor/*',
    '/editor/:ResourceId/*'
]);

const
    middleware = [<any> thunk],
    reducers = {
        RequestGridReducer
    };

const createStoreWithMiddleware = applyMiddleware(
    ...middleware
)(createStore);

export default function configureStore() {
    return createStoreWithMiddleware(reducers, {});
}