///<reference path='../../node_modules/immutable/dist/immutable.d.ts'/>

import * as _ from 'lodash'
import * as Immutable from 'immutable'

import { Grid } from './Components/Grid'

import { REQUEST_UPDATE_GRID } from './Actions'

export function RequestGridReducer(state:Immutable.Map<string,Grid|Date>, action) {
    if (_.isUndefined(state)) state = Immutable.Map({
        lastUpdated: null,
        requestUpdateGrid: null
    });

    switch (action.type) {
        case REQUEST_UPDATE_GRID:
            return state.merge({
                lastUpdated: new Date(),
                requestUpdateGrid: action.requestUpdateGrid
            });
        default:
            return state;
    }
}