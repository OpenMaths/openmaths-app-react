import { Grid } from './Components/Grid'

export const REQUEST_UPDATE_GRID = 'REQUEST_UPDATE_GRID';
export function requestUpdateGrid(grid:Grid) {
    return {
        type: REQUEST_UPDATE_GRID,
        requestUpdateGrid: grid
    };
}