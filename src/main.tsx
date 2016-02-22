import '../public/css/app.sass'

import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './configureStore'

const store = configureStore();

import View from './View/View'

render(
    <Provider store={store}>
        <main id="app">
            <View/>
        </main>
    </Provider>,
    document.getElementById('OpenMathsAppContainer')
);