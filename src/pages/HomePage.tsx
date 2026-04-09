import Animation from "../components/Animation";
import BlogCard from "../components/BlogCard";
import ExperienceCard from "../components/ExperienceCard";
import Footer from "../components/Footer";
import { blogPosts } from "../content/blogPosts";
import useMediaQuery from "../hooks/useMediaQuery";
import styles from "./HomePage.module.css";

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

export default function HomePage() {
  const isMobile = useMediaQuery("(max-width: 1000px)");

  return (
    <div className={styles.container}>
      <div className={styles.contentSide}>
        <header className={styles.header}>
          <h1>Justin Li</h1>
        </header>

        <main className={styles.grid}>
          <section className={styles.section + " " + styles.about}>
            <p>
              Welcome to my website! I'm currently studying computer science at the University of
              British Columbia. My technical interests lie in AI and decentralized systems. In my
              free time, I like to produce music, play tennis, and invest in stocks. Feel free to
              message me on LinkedIn!
            </p>
          </section>

          <section className={styles.section}>
            <h2>Experience</h2>
            <div className={styles.experienceList}>
              {experiences.map((experience) => (
                <ExperienceCard key={`${experience.company}-${experience.role}`} {...experience} />
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2>Blog</h2>
            <div className={styles.blogList}>
              {blogPosts.map((post) => (
                <BlogCard
                  key={post.slug}
                  date={post.date}
                  slug={post.slug}
                  summary={post.summary}
                  title={post.title}
                />
              ))}
            </div>
          </section>
        </main>
      </div>

      <div className={styles.animationSide}>{!isMobile && <Animation />}</div>

      <Footer />
    </div>
  );
}
