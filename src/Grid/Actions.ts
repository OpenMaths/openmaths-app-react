import { Grid, GridUrlConstruct } from './Components/Grid'
import { RowUrlConstruct } from './Components/Row'
import { IRequestUpdateGrid } from './DataModel'

// INIT GRID
export const REQUEST_INIT_GRID = 'REQUEST_INIT_GRID';
export function requestInitGrid(url:GridUrlConstruct) {
    return {
        type: REQUEST_INIT_GRID,
        requestInitGrid: url
    };
}

export const TRIGGER_INIT_GRID = 'TRIGGER_INIT_GRID';
export function triggerInitGrid(grid:Grid) {
    return {
        type: TRIGGER_INIT_GRID,
        triggerInitGrid: grid
    };
}

// UPDATE GRID
export const REQUEST_UPDATE_GRID = 'REQUEST_UPDATE_GRID';
export function requestUpdateGrid(id:string, url:GridUrlConstruct) {
    const data:IRequestUpdateGrid = {id: id, url: url};

    return {
        type: REQUEST_UPDATE_GRID,
        requestUpdateGrid: data
    };
}

export const TRIGGER_UPDATE_GRID = 'TRIGGER_UPDATE_GRID';
export function triggerUpdateGrid(grid:Grid) {
    return {
        type: TRIGGER_UPDATE_GRID,
        triggerUpdateGrid: grid
    };
}