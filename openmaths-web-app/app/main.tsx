import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './configureStore'

const store = configureStore();

import View from './View/View'

render(
    <Provider store={store}>
        <View/>
    </Provider>,
    document.getElementById('OpenMathsAppContainer')
);