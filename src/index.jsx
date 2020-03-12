import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import './base.less'


const render = () => {
    ReactDOM.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById('sly')
    )
}

if (module.hot) {
    module.hot.accept()
    render()
} else {
    render()
}