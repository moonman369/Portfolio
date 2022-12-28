import React from 'react'
import CTA from './CTA'

const Header = () => {
  return (
    <header>
      <div className="container header__container">
        <h5>Hello I'm</h5>
        <h1>Ayan Maiti</h1>
        <h5 className="textlight">Web3 Developer</h5>
        <CTA />
      </div>
    </header>
  )
}

export default Header