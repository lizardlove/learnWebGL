import "core-js/stable"
import "regenerator-runtime/runtime"
// import "@babel/polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
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