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
                I'm a 3rd year computer science student at the University of British Columbia. I'm currently interested
                in building audio software and AI infrastructure. In my free time, I like to play tennis and produce
                music (check out my YouTube channel). Feel free to message me on LinkedIn if you want to chat about
                anything!
              </p>
            </section>

            <section className="section experience">
              <h2>Experience</h2>
              <ul>
                <li>
                  <div className="role-line">
                    <span className="role">Software Development Engineer Intern</span>
                    <span className="company">@ Amazon</span>
                  </div>
                  <span className="experience-desc">Incoming Summer 2026</span>
                  <div className="role-line">
                    <span className="role">Software Engineer Intern</span>
                    <span className="company">@ Ciena</span>
                  </div>
                  <span className="experience-desc">Developed AI agents to automate network management</span>
                </li>
                <li>
                  <div className="role-line">
                    <span className="role">Co-Founder</span>
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
