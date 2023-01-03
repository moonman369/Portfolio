import React from 'react'
import './header.css'
import {BsLinkedin} from 'react-icons/bs'
import {FaGithub} from 'react-icons/fa'
import {SiLeetcode} from 'react-icons/si'


const HeaderSocials = () => {
  return (
    <div className='header__socials'>
        <a href="https://www.linkedin.com/in/ayan-maiti-5b4332233/" title='LinkedIn' target='_blank'><BsLinkedin/></a>
        <a href="https://github.com/moonman369" title='GitHub' target='_blank'><FaGithub/></a>
        <a href="https://leetcode.com/moonman369" title='Leetcode' target='_blank'><SiLeetcode/></a>
    </div>
  )
}

export default HeaderSocials