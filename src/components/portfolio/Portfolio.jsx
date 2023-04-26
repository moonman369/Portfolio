import React from "react";
import "./portfolio.css";
import img1 from "../../assets/avaxgods.png";
import img2 from "../../assets/defund2.png";
import img3 from "../../assets/selfdrvcar.png";
import img4 from "../../assets/raffle.png";
import img5 from "../../assets/anychat.png";
import img6 from "../../assets/dicey.png";

const data = [
  {
    id: 1,
    image: img1,

    title: "AVAX Gods - NFT Card Game",
    github: "https://github.com/moonman369/AVAX-Gods-Frontend",
    demo: "https://avaxgodsonline.netlify.app/",
  },
  {
    id: 2,
    image: img2,
    title: "DeFund: Decentralized Crowdfunding",
    github: "https://github.com/moonman369/DeFund",
    demo: "https://defund.netlify.app/",
  },
  {
    id: 3,
    image: img3,
    title: "AI Based Self Driving Car",
    github: "https://github.com/moonman369/Self-Driving-AI-Car",
    demo: "https://github.com/moonman369/Self-Driving-AI-Car",
  },
  // {
  //   id: 3,
  //   image: img3,
  //   title: "MoonFarm - Defi Staking Platform",
  //   github: "https://github.com/moonman369/MoonFi",
  //   demo: "https://github.com",
  // },
  {
    id: 4,
    image: img4,
    title: "Ethereum Raffle: Decentralized Lottery",
    github: "https://github.com/moonman369/Ethereum-Raffle-DApp",
    demo: "https://ethereum-raffle-dapp.vercel.app/",
  },
  {
    id: 5,
    image: img5,

    title: "AnyChat - Anonymous messaging app",
    github: "https://github.com/moonman369/AnyChat",
    demo: "https://anychat.cyclic.app/",
  },
  {
    id: 6,
    image: img6,
    title: "Dicey - An Interactive Game of Chance",
    github: "https://github.com/moonman369/Dicey",
    demo: "https://moonman369.github.io/Dicey/",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio">
      <h5>My Recent Work</h5>
      <h2>Portfolio</h2>

      <div className="container portfolio__container">
        {data.map(({ id, image, title, github, demo }) => {
          return (
            <article key={id} className="portfolio__item">
              <div className="portfolio__item-image">
                <img src={image} alt="" />
              </div>
              <h3>{title}</h3>
              <div className="portfolio__item-cta">
                <a href={github} className="btn" target="_blank">
                  GitHub
                </a>
                <a href={demo} className="btn btn-primary" target="_blank">
                  Live Demo
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Portfolio;
