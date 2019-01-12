import React from 'react'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'

class App extends React.Component {
  render() {
    return (
      <div className={'app'}>
        <Header></Header>
        <Body></Body>
        <Footer></Footer>
      </div>
    )
  }
}

export default App