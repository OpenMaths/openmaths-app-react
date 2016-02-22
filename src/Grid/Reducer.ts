import * as _ from 'lodash'

import { REQUEST_INIT_GRID, REQUEST_UPDATE_GRID } from './Actions'
import { TRIGGER_INIT_GRID } from './Actions'
import { RequestGridState, TriggerGridState } from './DataModel'

export function RequestGridReducer(state:RequestGridState, action) {
    if (_.isUndefined(state)) state = new RequestGridState;

    switch (action.type) {
        case REQUEST_INIT_GRID:
            return new RequestGridState(action.requestInitGrid);
        case REQUEST_UPDATE_GRID:
            return new RequestGridState(state.requestInitGrid, action.requestUpdateGrid);
        default:
            return state;
    }
}

export function TriggerGridReducer(state:TriggerGridState, action) {
    if (_.isUndefined(state)) state = new TriggerGridState;

    switch (action.type) {
        case TRIGGER_INIT_GRID:
            return new TriggerGridState(action.triggerInitGrid);
        default:
            return state;
    }
}