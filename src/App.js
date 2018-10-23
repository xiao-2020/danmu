import React, { Component } from 'react'
import './App.css';
import Test from './test'
import Left from './left'
import ObjectComponet from './objectComponemt'
class App extends Component {
  constructor() {
    super();
    this.state = {
      showTips: false,
      num: 100
    }
    this.click = _ => this.setState({showTips:true})
    this.cancel = _ => this.setState({showTips:false})
    this.setNum = v => this.setState({num: v})
  }
  render() {
    return (
      <div className='body-box'>
        <button onClick={this.click}>点我弹窗口</button>
        <p>{this.state.num}</p>
        {this.state.showTips && <Test num= { this.state.num }  cancle= { this.cancel } setNum= {this.setNum} left={ <Left /> }>1209</Test>}
        <ObjectComponet.a a={1} />
      </div>
    );
  }
}

export default App;
