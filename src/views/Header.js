import React  from 'react'

import css from './app.styl'

console.log(css)



class Header extends React.Component {
  render() {
    return <div className={css['app-test']} > <img src={require('@/assets/2.jpeg')} /> </div>
  }
}

export default Header