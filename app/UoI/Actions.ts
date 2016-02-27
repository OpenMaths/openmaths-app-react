///uoi/:id

import * as axios from 'axios'
import * as _ from 'lodash'
import * as Rx from 'rx'

import UoI from './Components/UoI';

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