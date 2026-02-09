import "./App.css";
import "./index.css";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import Animation from "./components/Animation";
import useMediaQuery from "./hooks/useMediaQuery";

function App() {
  const [infoFlipped, setInfoFlipped] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1000px)");
  return (
    <div className="container">
      <div className="main-layout">
        <div className="content-side">
          <header className="header">
            <h1>Justin Li</h1>
          </header>

          <main className="grid">
            <section className="section about">
              <h2>About</h2>
              <p>
                I'm a software developer and computer science student at the University of British Columbia. I enjoy
                creating cool things.
              </p>
            </section>

            <section className="section experience">
              <h2>Experience</h2>
              <ul>
                <li>
                  <div className="role-line">
                    <span className="role">Software Engineer Intern</span>
                    <span className="company">@ Ciena</span>
                  </div>
                  <span className="experience-desc">Developed AI agents to automate network management</span>
                </li>
                <li>
                  <div className="role-line">
                    <span className="role">Founding Software Engineer</span>
                    <span className="company">@ Silk Road Strategies</span>
                  </div>
                  <span className="experience-desc">
                    Built a full-stack platform for backtesting trading strategies
                  </span>
                </li>
                <li>
                  <div className="role-line">
                    <span className="role">Debate Coach</span>
                    <span className="company">@ Vancouver Debate Academy</span>
                  </div>
                  <span className="experience-desc">Coached high school students in competitive speech and debate</span>
                </li>
              </ul>
            </section>

            <section className="section projects">
              <h2>Projects</h2>
              <ul>
                <li>
                  <span className="project-name">Frost Reverb</span>
                  <span className="project-desc">Shimmer reverb audio effect plugin for Mac and Windows</span>
                </li>
                <li>
                  <span className="project-name">Pairs Trading Bot</span>
                  <span className="project-desc">Trading bot trained with deep reinforcement learning</span>
                </li>
              </ul>
            </section>

            <section className="section links">
              <h2>Links</h2>
              <div className="link-list">
                <a href="https://github.com/justinli34" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/justinlibc"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.youtube.com/@justinli34"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
              </div>
            </section>
          </main>
        </div>

        <div className="animation-side">{!isMobile && <Animation />}</div>
      </div>

      <div className={`info-card ${infoFlipped ? "expanded" : ""}`} onClick={() => setInfoFlipped(!infoFlipped)}>
        <FiInfo className="info-icon" />
        <div className="info-content">
          <p className="info-title">Last Updated</p>
          <p className="info-text">February 2026</p>
          <p className="info-title">Animation Credits</p>
          <p className="info-text">@yuruyurau on X</p>
        </div>
      </div>
    </div>
  );
}

export default App;
