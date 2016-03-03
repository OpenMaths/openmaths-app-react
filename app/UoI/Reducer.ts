import * as _ from 'lodash'
import * as Immutable from 'immutable'

import UoI from './Components/UoI'

import { REQUEST_UOI_DATA, RECEIVE_UOI_DATA, REQUEST_UOI_TO_BE_INSERTED,
    CHECK_UOI_INSERTABLE, DISPOSE_UOI_INSERTABLE, REQUEST_CELL_CREATABLE, CONFIRM_IF_CELL_CREATABLE } from './Actions'

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
        case REQUEST_UOI_TO_BE_INSERTED:
            const data_REQUEST_UOI_TO_BE_INSERTED = {x: action.x, y: action.y, id: action.id};

            return state.merge({
                InsertUoI: data_REQUEST_UOI_TO_BE_INSERTED
            });
        case CHECK_UOI_INSERTABLE:
            const data_CHECK_UOI_INSERTABLE = {x: action.x, y: action.y};

            return state.merge({
                checkUoIInsertable: data_CHECK_UOI_INSERTABLE
            });
        case DISPOSE_UOI_INSERTABLE:
            return state.merge({
                checkUoIInsertable: null
            });
        case REQUEST_CELL_CREATABLE:
            return state.merge({
                cellCreatableSide: action.side,
                cellCreatableId: action.id,
                cellCreate: null
            });
        case CONFIRM_IF_CELL_CREATABLE:
            const cellCreate = state.get('cellCreatableSide');

            return state.merge({
                cellCreate: cellCreate,
                cellCreatableSide: null
            });
        default:
            return state;
    }
}