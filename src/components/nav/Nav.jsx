import React, { useState } from 'react'
import './nav.css'
import {AiOutlineHome, AiOutlineUser} from 'react-icons/ai'
import {BiBook, BiMessageSquareDetail, BiCodeAlt} from 'react-icons/bi'
import {RiServiceLine} from 'react-icons/ri'
import {IoIosStats} from 'react-icons/io'

const Nav = () => {
  const [activeNav, setActiveNav] = useState('#')
  return (
    <nav>
      <a href='#' title='Home' onClick={() => {setActiveNav('#')}} className={activeNav === '#' ? 'active' : ''}><AiOutlineHome /></a>
      <a href='#about'title='About'  onClick={() => {setActiveNav('#about')}} className={activeNav === '#about' ? 'active' : ''}><AiOutlineUser /></a>
      <a href='#experience' title='Experience' onClick={() => {setActiveNav('#experience')}} className={activeNav === '#experience' ? 'active' : ''}><BiBook /></a>
      <a href='#stats' title='Stats' onClick={() => {setActiveNav('#stats')}} className={activeNav === '#stats' ? 'active' : ''}><IoIosStats /></a>
      <a href='#portfolio' title='Portfolio' onClick={() => {setActiveNav('#portfolio')}} className={activeNav === '#portfolio' ? 'active' : ''}><BiCodeAlt /></a>
      <a href='#contact' title='Contact' onClick={() => {setActiveNav('#contact')}} className={activeNav === '#contact' ? 'active' : ''}><BiMessageSquareDetail name='Contact'/></a>
    </nav>
  )
}

export default Nav