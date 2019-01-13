import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import 'normalize.css'
import App from './views/App'
import './views/test.css'
import './views/app.styl'
ReactDOM.render(
  <App />,
  document.getElementById('root')
);