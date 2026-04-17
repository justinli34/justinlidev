import { Link } from "react-router";
import { type BlogPostMetadata } from "../types/blog";
import styles from "./BlogCard.module.css";

export default function BlogCard({ date, slug, title }: BlogPostMetadata) {
  return (
    <article>
      <Link to={`/blog/${slug}`} className={styles.card}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.date}>{date}</p>
        </div>
      </Link>
    </article>
  );
}
