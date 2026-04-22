import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import { blogPosts } from "../content/blogPosts";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.contentSide}>
        <header className={styles.header}>
          <h1>Justin Li</h1>
        </header>

        <main className={styles.grid}>
          <section className={styles.section + " " + styles.about}>
            <p>
              Welcome to my website! I'm a CS student at UBC and software developer based in
              Vancouver. I'm interested in the applications of AI, as well as decentralized systems
              and how they can create fairer societies. This summer, I'll be interning at Amazon.
              Outside of coding, I like to produce music - check out my YouTube! Feel free to
              message me on LinkedIn or email me at justin@justinli.dev.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Blog</h2>
            <div className={styles.blogList}>
              {blogPosts.map((post) => (
                <BlogCard key={post.slug} date={post.date} slug={post.slug} title={post.title} />
              ))}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
}
