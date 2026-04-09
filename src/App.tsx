import "./App.css";
import "./index.css";
import Animation from "./components/Animation";
import ExperienceCard from "./components/ExperienceCard";
import Footer from "./components/Footer";
import experienceStyles from "./components/ExperienceCard.module.css";
import useMediaQuery from "./hooks/useMediaQuery";

const experiences = [
  {
    role: "Software Development Engineer Intern",
    company: "Amazon",
    description: "Incoming Summer 2026",
  },
  {
    role: "Software Engineer Intern",
    company: "Ciena",
    description: "Built AI agents to automate network management",
  },
  {
    role: "Debate Coach",
    company: "Vancouver Debate Academy",
    description: "Coached high school students in competitive debate classes",
  },
] as const;

function App() {
  const isMobile = useMediaQuery("(max-width: 1000px)");
  return (
    <div className="container">
      <div className="content-side">
        <header className="header">
          <h1>Justin Li</h1>
        </header>

        <main className="grid">
          <section className="section about">
            <p>
              Welcome to my website! I'm currently studying computer science at the University of
              British Columbia. My technical interests lie in AI and decentralized systems. In my
              free time, I like to produce music, play tennis, and invest in stocks. Feel free to
              message me on LinkedIn!
            </p>
          </section>

          <section className="section">
            <h2>Experience</h2>
            <div className={experienceStyles.list}>
              {experiences.map((experience) => (
                <ExperienceCard key={`${experience.company}-${experience.role}`} {...experience} />
              ))}
            </div>
          </section>
        </main>
      </div>

      <div className="animation-side">{!isMobile && <Animation />}</div>

      <Footer />
    </div>
  );
}

export default App;
