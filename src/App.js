import React, { Component } from 'react'
import './App.css';
import Test from './test'
class App extends Component {
  render() {
    return (
      <div className='body-box'>
        <span>这是app组件</span>
        <Test name='sb'></Test>
      </div>
    );
  }
}

export default App;
