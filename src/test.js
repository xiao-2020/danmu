import React, { Component } from 'react'
import './test.css'
class Test extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      date: new Date()
    }
    this.tick = () => {
      this.setState({
        date: new Date()
      })
    }
  }
  componentDidMount() {
    console.log('componentDidMount', this.tick)
    this.timerID = setInterval(this.tick, 1000)
  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
    clearInterval(this.timerID)
  }
  render() {
    return (
      <div>
        <h1>Hello, { this.props.name }!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
        <span>这是test组件</span>
      </div>
    );
  }
}

export default Test;