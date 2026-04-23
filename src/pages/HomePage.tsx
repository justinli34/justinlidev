import BlogCard from "../components/BlogCard";
import { blogPosts } from "../content/blogPosts";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Justin Li</h1>
        <h2>Software Developer</h2>
      </header>

      <main className={styles.main}>
        <section className={styles.about}>
          <p>
            Hi! I'm a CS student at UBC and software developer based in Vancouver. I'm interested in
            AI, decentralized systems, and building software that supports a fairer society. This
            summer, I'll be interning at Amazon. Outside of coding, I like to produce music. You can
            find me on{" "}
            <a href="https://github.com/justinli34" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            ,{" "}
            <a
              href="https://www.linkedin.com/in/justinlibc"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            , and{" "}
            <a href="https://www.youtube.com/@justinli34" target="_blank" rel="noopener noreferrer">
              YouTube
            </a>
            , or email me at <a href="mailto:justin@justinli.dev">justin@justinli.dev</a>.
          </p>
        </section>

        <section className={styles.blog}>
          <h2>Blog</h2>
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} date={post.date} slug={post.slug} title={post.title} />
          ))}
        </section>
      </main>
    </div>
  );
}
