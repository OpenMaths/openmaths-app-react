import * as _ from 'lodash'
import * as Immutable from 'immutable'

import UoI from './Components/UoI'

import { REQUEST_UOI_DATA, RECEIVE_UOI_DATA, REQUEST_UOI_TO_BE_INSERTED } from './Actions'

export function UoIReducer(state:Immutable.Map<string,any>, action) {
    if (_.isUndefined(state)) state = Immutable.Map({
        isFetching: false,
        lastUpdated: null,
        UoI: null,
        //InsertUoI: null
    });

    switch (action.type) {
        case REQUEST_UOI_DATA:
            return state.merge({
                isFetching: true
            });
        case RECEIVE_UOI_DATA:
            return state.merge({
                isFetching: false,
                lastUpdated: new Date(),
                UoI: action.data
            });
        case REQUEST_UOI_TO_BE_INSERTED:
            const data = {x: action.x, y: action.y, id: action.id};

            return state.merge({
                InsertUoI: data
            });
        default:
            return state;
    }
}