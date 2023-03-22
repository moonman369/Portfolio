import React from "react";
import "./about.css";
import ABT from "../../assets/me-about.jpg";
import { BsCodeSlash } from "react-icons/bs";
import { FaAward } from "react-icons/fa";
import { VscFolderLibrary } from "react-icons/vsc";

const About = () => {
  return (
    <section id="about">
      <h5>Get To Know</h5>
      <h2>About me</h2>

      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1688/1688400.png"
              alt="About Me"
            />
          </div>
        </div>

        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Academics</h5>
              <small>8.42 Average CGPA</small>
            </article>

            <article className="about__card">
              <BsCodeSlash className="about__icon" />
              <h5>Codeability</h5>
              <small>25k+ lines of code</small>
            </article>

            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>10+ Projects Completed</small>
            </article>
          </div>

          <p>
            I am Ayan Maiti, a Final Year, Electrical Engineering student (Batch
            2023). I have worked as a Blockchain/Web3 Developer Intern at W3Dev
            Private Limited for four(4) months. I have an in-depth understanding
            of blockchain development, its related concepts, and fullstack web
            development
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
