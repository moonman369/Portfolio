import React, { useState } from "react";
import "./about.css";
import { BsCodeSlash } from "react-icons/bs";
import { FaAward } from "react-icons/fa";
import { VscFolderLibrary } from "react-icons/vsc";
import MatrixRain from "../matrix-rain/MatrixRain";
import Logo from "../../assets/logo_cropped.png";
import useInterval from "@use-it/interval";

const About = () => {
  const [displayMatrix, setDisplayMatrix] = useState(false);
  return (
    <section id="about" className="about">
      <h5>Get To Know</h5>
      <h2>About me</h2>

      {displayMatrix ? <MatrixRain customClass="matrix" /> : <div></div>}

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img
              // src="https://cdn-icons-png.flaticon.com/512/1688/1688400.png"
              src={Logo}
              alt="About Me"
              onMouseEnter={() => {
                setTimeout(() => {
                  setDisplayMatrix(true);
                }, 300);
              }}
              onMouseLeave={() => {
                // setTimeout(() => {
                //   setDisplayMatrix(false);
                // }, 300);
                setDisplayMatrix(false);
              }}
            />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Academics</h5>
              <small>8.99 Average CGPA</small>
            </article>

            <article className="about__card">
              <BsCodeSlash className="about__icon" />
              <h5>Codeability</h5>
              <small>35k+ lines of code</small>
            </article>

            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>10+ Projects Completed</small>
            </article>
          </div>

          <p>
            I am Ayan Maiti, currently working as a System Engineer at Tata
            Consultancy Services Limited. I specialize in Azure-based systems,
            microservices, and API integrations, with hands-on experience in the
            retail domain. Alongside my professional work, I actively build
            skills in artificial intelligence and adjacent technologies, with a
            growing focus on intelligent, data-driven systems.
          </p>

          <a href="#contact" className="btn btn-primary">
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
