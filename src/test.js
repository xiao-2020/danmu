import React, { Component } from 'react'
import './test.css'
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      num: 0
    }
    this.tick = () => {
      this.setState({
        date: new Date()
      })
    }
    this.change = (event) => {
      this.setState({
        num: event.target.value
      })
      this.props.setNum(event.target.value)
    }
  }
  componentWillMount() {
    this.setState({
      num: this.props.num
    })
  }
  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000)
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
    clearInterval(this.timerID)
  }
  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
        <p>这是test组件</p>
        <input type="text" value= { this.state.num } onChange= { this.change } />
        <br />
        <br />
        <br />
        <button onClick={this.props.cancle}>点我关闭</button>
      </div>
    );
  }
}

export default Test;