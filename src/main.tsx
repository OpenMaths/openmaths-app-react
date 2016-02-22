import '../public/css/app.sass'

import * as React from 'react'
import { render } from 'react-dom'

import { Grid, GridUrlConstruct } from './Grid/Components/Grid'
import { Row, RowUrlConstruct } from './Grid/Components/Row'
import { Column, ColumnConstructor } from './Grid/Components/Column'

import GridElement from './Grid/Elements/Grid'

const
    columnsUrl = [Column.construct(ColumnConstructor.Content, Grid.constructEmpty())],
    rowsUrl = [Row.construct(columnsUrl)],
    gridUrl = Grid.construct(rowsUrl);

render(
    <GridElement layout={new Grid(gridUrl)}/>,
    document.getElementById('OpenMathsAppContainer')
);