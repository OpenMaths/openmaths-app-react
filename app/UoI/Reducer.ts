import * as _ from 'lodash'
import * as Immutable from 'immutable'

import UoI from './Components/UoI'

import { REQUEST_UOI_DATA, RECEIVE_UOI_DATA } from './Actions'

export function UoIReducer(state:Immutable.Map<string,any>, action) {
    if (_.isUndefined(state)) state = Immutable.Map({
        isFetching: false,
        lastUpdated: null,
        UoI: null
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
        default:
            return state;
    }
}