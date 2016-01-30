import '../public/css/app.sass'

import * as React from 'react'
import { render } from 'react-dom'

import Grid from './Grid/Grid'

render(
    <Grid rows={1} columns={1}/>,
    document.getElementById('OpenMathsAppContainer')
);