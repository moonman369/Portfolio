import React from "react";
import "./header.css";
import CTA from "./CTA";
import ME from "../../assets/me.png";
import HeaderSocials from "./HeaderSocials";

const Header = () => {
  return (
    <header>
      <div className="container header__container">
        <h5>Hello I'm</h5>
        <h1>Ayan Maiti</h1>
        <h5 className="text-light">Web3 Developer</h5>
        <CTA />
        <HeaderSocials />

        <div className="me">
          <img
            className="me-image"
            src="https://cdn-icons-png.flaticon.com/512/5768/5768767.png"
            alt="me"
          />
        </div>

        <a href="#contact" className="scroll__down">
          Scroll Down
        </a>
      </div>
    </header>
  );
};

export default Header;
