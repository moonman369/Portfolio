import React, { useState } from "react";
import "./nav.css";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BiBook, BiMessageSquareDetail, BiCodeAlt } from "react-icons/bi";
import { RiServiceLine } from "react-icons/ri";
import { Link, scroll, animateScroll } from "react-scroll";
import { IoIosStats } from "react-icons/io";

const Nav = () => {
  const [activeNav, setActiveNav] = useState("#");

  const handleNav = (to) => {
    setActiveNav(to);
    // console.log(window.history)
    // window.history.replaceState(null, '', '#')
    // window.history.back()
    // console.log(window.location)
  };

  return (
    <nav>
      <a
        href="#"
        title="Home"
        onClick={() => {
          handleNav("#");
        }}
        className={activeNav === "#" ? "active" : ""}
      >
        <AiOutlineHome />
      </a>
      <a
        href="#about"
        title="About"
        onClick={() => {
          handleNav("#about");
        }}
        className={activeNav === "#about" ? "active" : ""}
      >
        <AiOutlineUser />
      </a>
      <a
        href="#experience"
        title="Experience"
        onClick={() => {
          handleNav("#experience");
        }}
        className={activeNav === "#experience" ? "active" : ""}
      >
        <BiBook />
      </a>
      <a
        href="#stats"
        title="Stats"
        onClick={() => {
          handleNav("#stats");
        }}
        className={activeNav === "#stats" ? "active" : ""}
      >
        <IoIosStats />
      </a>
      <a
        href="#portfolio"
        title="Portfolio"
        onClick={() => {
          handleNav("#portfolio");
        }}
        className={activeNav === "#portfolio" ? "active" : ""}
      >
        <BiCodeAlt />
      </a>
      <a
        href="#contact"
        title="Contact"
        onClick={() => {
          handleNav("#contact");
        }}
        className={activeNav === "#contact" ? "active" : ""}
      >
        <BiMessageSquareDetail name="Contact" />
      </a>
    </nav>
  );
};

export default Nav;
