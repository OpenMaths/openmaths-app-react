///<reference path='../../node_modules/immutable/dist/immutable.d.ts'/>

import * as _ from 'lodash'
import * as Immutable from 'immutable'

import { Grid, GridUrlConstruct } from './Components/Grid'
import { Row, RowUrlConstruct } from './Components/Row'
import { Column, ColumnUrlConstruct } from './Components/Column'

import { REQUEST_INIT_GRID, REQUEST_UPDATE_GRID } from './Actions'
import { TRIGGER_INIT_GRID, TRIGGER_UPDATE_GRID } from './Actions'
import { RequestGridState, TriggerGridState } from './DataModel'

export function RequestGridReducer(state:Immutable.Map<string,GridUrlConstruct|RowUrlConstruct|ColumnUrlConstruct>, action) {
    if (_.isUndefined(state)) state = Immutable.Map({
        requestInitGrid: null,
        requestUpdateGrid: null
    });

    switch (action.type) {
        case REQUEST_INIT_GRID:
            return state.set('requestInitGrid', action.requestInitGrid);
        case REQUEST_UPDATE_GRID:
            return state.set('requestUpdateGrid', action.requestUpdateGrid);
        default:
            return state;
    }
}

export function TriggerGridReducer(state:Immutable.Map<string,Grid|Row|Column>, action) {
    if (_.isUndefined(state)) state = Immutable.Map({
        triggerInitGrid: null,
        triggerUpdateGrid: null
    });

    switch (action.type) {
        case TRIGGER_INIT_GRID:
            return state.set('triggerInitGrid', action.triggerInitGrid);
        case TRIGGER_UPDATE_GRID:
            return state.set('triggerUpdateGrid', action.triggerUpdateGrid);
        default:
            return state;
    }
}