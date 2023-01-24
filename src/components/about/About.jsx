import React from "react";
import "./about.css";
import ABT from "../../assets/me-about.jpg";
import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
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
              <h5>Experience</h5>
              <small>3+ years Work Experience</small>
            </article>

            <article className="about__card">
              <FiUsers className="about__icon" />
              <h5>Clients</h5>
              <small>300+ Worldwide</small>
            </article>

            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>10+ Projects Completed</small>
            </article>
          </div>

          <p>
            I am Ayan Maiti, a Final Year, Electrical Engineering student (Batch
            2023). I have worked as a Blockchain Developer Intern at W3Dev
            Private Limited for four(4) months. I have an in-depth understanding
            of the blockchain development and its related concepts.
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
