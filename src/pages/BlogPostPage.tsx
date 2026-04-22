import { Link, Navigate, useParams } from "react-router";
import { getBlogPost } from "../content/blogPosts";
import styles from "./BlogPostPage.module.css";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return <Navigate to="/" replace />;
  }

  const { Content } = post;

  return (
    <div className={styles.container}>
      <div className={styles.topStrip}>
        <Link className={styles.homeLink} to="/">
          Justin Li
        </Link>
      </div>
      <section className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.date}>{post.date}</p>
        </div>
        <article className={styles.post}>
          <Content />
        </article>
      </section>
    </div>
  );
}
