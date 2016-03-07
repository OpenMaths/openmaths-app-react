import * as axios from 'axios'
import * as _ from 'lodash'
import * as Rx from 'rx'

import * as API from '../Utils/Api'
import { Side } from '../Utils/TouchesWindowBoundaries'

import { UoI, UoIConstruct, ContentType } from './Components/UoI'

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

export function getUoIData(uoiConstruct:any) {
    return function (dispatch:Redux.Dispatch) {
        dispatch(requestUoIData());

        const construct = <UoIConstruct> uoiConstruct;

        let url;

        switch (construct.contentType) {
            case ContentType.WikipediaContent:
                url = '/uoi/wikipedia/' + construct.id;
                break;
        }

        const getUoIDataPromise = API.ServerInstance.get(url);

        Rx.Observable
            .fromPromise(getUoIDataPromise)
            .subscribe((response) => {
                dispatch(receiveUoIData(new UoI(construct.contentType, response.data)));
            }, (err) => {
                console.error(err);
                // @TODO toggle error notification
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