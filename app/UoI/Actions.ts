///uoi/:id

import * as axios from 'axios'
import * as _ from 'lodash'
import * as Rx from 'rx'

import { Side } from '../Utils/TouchesWindowBoundaries'

import UoI from './Components/UoI'

const Http = axios.create({
    baseURL: 'http://localhost:8081/api'
});

export const REQUEST_UOI_DATA = 'REQUEST_UOI_DATA ';
function requestUoIData() {
    return {
        type: REQUEST_UOI_DATA
    };
}

export const RECEIVE_UOI_DATA = 'RECEIVE_UOI_DATA';
function receiveUoIData(uoi:UoI) {
    return {
        type: RECEIVE_UOI_DATA,
        data: uoi
    };
}

export function getUoIData(id:string) {
    return function (dispatch:Redux.Dispatch) {
        dispatch(requestUoIData());

        const
            url = '/uoi/' + id,
            getUoIDataPromise = Http.get(url, true);

        Rx.Observable.fromPromise(getUoIDataPromise)
            //    .map((response:any):AppDescriptionObject[] => _.map(response.data, data =>
            //        new AppDescriptionObject(data)))
            .subscribe((response) => {
                dispatch(receiveUoIData(new UoI(response.data)));
            }, (err) => {
                console.error(err);
                //dispatch(showNotification('Could not load VCM App Description List from ' + host, NotificationType.Error));
            });
    }
}

export const REQUEST_UOI_TO_BE_INSERTED = 'REQUEST_UOI_TO_BE_INSERTED';
export function requestUoIToBeInserted(x:number, y:number, id:string) {
    return {
        type: REQUEST_UOI_TO_BE_INSERTED,
        x: x,
        y: y,
        id: id
    };
}

export const CHECK_UOI_INSERTABLE = 'CHECK_UOI_INSERTABLE';
export function checkUoIInsertable(x:number, y:number) {
    return {
        type: CHECK_UOI_INSERTABLE,
        x: x,
        y: y
    };
}

export const DISPOSE_UOI_INSERTABLE = 'DISPOSE_UOI_INSERTABLE';
export function disposeUoIInsertable() {
    return {
        type: DISPOSE_UOI_INSERTABLE
    };
}

export const REQUEST_CELL_CREATABLE = 'REQUEST_CELL_CREATABLE';
export function requestCellCreatable(side:Side, id:string) {
    return {
        type: REQUEST_CELL_CREATABLE,
        side: side,
        id: id
    };
}

export const CONFIRM_IF_CELL_CREATABLE = 'CONFIRM_IF_CELL_CREATABLE';
export function confirmIfCellCreatable() {
    return {
        type: CONFIRM_IF_CELL_CREATABLE
    };
}