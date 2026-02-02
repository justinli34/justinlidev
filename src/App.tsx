import { useState } from 'react'
import './App.css'
import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { useAudioAnalyzer } from './hooks/useAudioAnalyzer'
import { WaveformVisualizer } from './components/WaveformVisualizer'

function App() {
  const { isPlaying, togglePlay, analyzerRef } = useAudioAnalyzer()
  const [hasInteracted, setHasInteracted] = useState(false)

  const handleToggle = () => {
    setHasInteracted(true)
    togglePlay()
  }

  return (
    <div className="container">
      <header className="header">
        <h1>
          Justin Li
        </h1>
      </header>

      <main className="grid">
        <section className="section about">
          <h2>About</h2>
          <p>
            I'm a software developer and computer science student at the University of British Columbia.
            I enjoy creating cool things.
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
              <span className="experience-desc">Built AI agents for network management</span>
            </li>
            <li>
              <div className="role-line">
                <span className="role">Founding Software Engineer</span>
                <span className="company">@ Silk Road Strategies</span>
              </div>
              <span className="experience-desc">Created a stock trading strategy backtesting app</span>
            </li>
            <li>
              <div className="role-line">
                <span className="role">Debate Coach</span>
                <span className="company">@ Vancouver Debate Academy</span>
              </div>
              <span className="experience-desc">Coached students in debate and public speaking</span>
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
            <a href="https://www.linkedin.com/in/justinlibc" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://www.youtube.com/@justinli34" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </section>
      </main>

      <WaveformVisualizer
        analyzerRef={analyzerRef}
        isPlaying={isPlaying}
        baselineOffset={70}
        hasInteracted={hasInteracted}
        onClick={handleToggle}
      />
    </div>
  )
}

export default App
