import React from 'react'
import CV from '../../assets/CV.pdf'

const CTA = () => {
  console.log('Hi')
  return (
    <div className='cta'>
        <a href={CV} download>Download CV</a>
        <a href='#contact'>Let's Talk</a>
    </div>
  )
}

export default CTA