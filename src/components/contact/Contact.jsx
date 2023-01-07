import React from 'react'
import './contact.css'
import {AiOutlineMail} from 'react-icons/ai'
import {FaTelegramPlane} from 'react-icons/fa'
import {FaWhatsapp} from 'react-icons/fa'

const Contact = () => {
  return (
    <section id='contact'>
      <h5>Get In Touch</h5>
      <h2>Contact Me</h2>

      <div className="container contact_container">
        <div className="contact__options">
          <article className='contact__option'>
            <AiOutlineMail/>
            <h4>Email</h4>
            <h5>mightyayan369@gmail.com</h5>
            <a href="mailto:mightyayan369@gmail.com" target='_blank'>Send a message</a>
          </article>

          <article className='contact__option'>
            <FaTelegramPlane/>
            <h4>Telegram</h4>
            <h5>@moonman369</h5>
            <a href="https://t.me/moonman369" target='_blank'>Send a message</a>
          </article>

          <article className='contact__option'>
            <FaWhatsapp/>
            <h4>WhatsApp</h4>
            <h5>+91 98302 25282</h5>
            <a href="https://api.whatsapp.com/send?phone=919830225282" target='_blank'>Send a message</a>
          </article>
        </div>
        {/* END OF CONTACT OPTIONS */}
        <form action=""></form>
      </div>
    </section>
  )
}

export default Contact