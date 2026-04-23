import { Navigate, useParams } from "react-router";
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
    <>
      <title>{`Justin Li - ${post.title}`}</title>
      <div className={styles.container}>
        <section>
          <div className={styles.header}>
            <h1>{post.title}</h1>
            <p className={styles.date}>{post.date}</p>
          </div>
          <article className={styles.post}>
            <Content />
          </article>
        </section>
      </div>
    </>
  );
}
