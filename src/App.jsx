import React, { useState } from "react";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import About from "./components/about/About";
import Experience from "./components/experience/Experience";
import Stats from "./components/stats/Stats";
import Portfolio from "./components/portfolio/Portfolio";
import Testimonials from "./components/testimonials/Testimonials";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Chat from "./components/chat/Chat";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import "react-notifications/lib/notifications.css";

const App = () => {
  const [isMoonmindOpen, setIsMoonmindOpen] = useState(false);

  return (
    <div>
      <Header onOpenMoonmind={() => setIsMoonmindOpen(true)} />
      <Nav
        isMoonmindOpen={isMoonmindOpen}
        onMoonmindToggle={() => setIsMoonmindOpen((prev) => !prev)}
      />
      <About />
      <Experience />
      <Stats />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
      <Chat isOpen={isMoonmindOpen} setIsOpen={setIsMoonmindOpen} />
      <NotificationContainer />
    </div>
  );
};

export default App;
