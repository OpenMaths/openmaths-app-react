import { Grid, GridUrlConstruct } from './Components/Grid'
import { RowUrlConstruct } from './Components/Row'

export enum RowPosition {Above, Below}
export enum ColumnPosition {Prepend, Append}
export enum SplitOperator {Horizontally, Vertically}

export interface IRequestUpdateGrid {
    id:string;
    url:GridUrlConstruct;
}

export class RequestGridState {
    // Requests to be consumed by UrlListener
    requestInitGrid:GridUrlConstruct;
    requestUpdateGrid:IRequestUpdateGrid;
    requestUpdateRow;
    requestUpdateColumn;

    constructor(requestInitGrid?:GridUrlConstruct, requestUpdateGrid?:IRequestUpdateGrid) {
        this.requestInitGrid = requestInitGrid ? requestInitGrid : null;
        this.requestUpdateGrid = requestUpdateGrid ? requestUpdateGrid : null;
    }
}

export class TriggerGridState {
    // Triggers to be consumed by individual Elements
    triggerInitGrid;
    triggerUpdateGrid;
    triggerUpdateRow;
    triggerUpdateColumn;

    constructor(triggerInitGrid?:Grid, triggerUpdateGrid?:Grid) {
        this.triggerInitGrid = triggerInitGrid ? triggerInitGrid : null;
        this.triggerUpdateGrid = triggerUpdateGrid ? triggerInitGrid : null;
    }
}