import React from 'react'
import Header from './components/header/Header'
import Nav from './components/nav/Nav'
import About from './components/about/About'
import Experience from './components/experience/Experience'
import Stats from './components/stats/Stats'
import Portfolio from './components/portfolio/Portfolio'
import Testimonials from './components/testimonials/Testimonials'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'
import NotificationContainer from 'react-notifications/lib/NotificationContainer'
import 'react-notifications/lib/notifications.css';


const App = () => {
  return (
    <div>
        <Header />
        <Nav />
        <About />
        <Experience />
        <Stats />
        <Portfolio />
        <Testimonials />
        <Contact />
        <Footer />
        <NotificationContainer />
    </div>
  )
}

export default App