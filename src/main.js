import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

const element = (
  <h1>
    Hello!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);