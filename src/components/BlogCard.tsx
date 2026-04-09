import { Link } from "react-router";
import styles from "./BlogCard.module.css";

type BlogCardProps = {
  date: string;
  slug: string;
  summary: string;
  title: string;
};

export default function BlogCard({ date, slug, summary, title }: BlogCardProps) {
  return (
    <article>
      <Link to={`/blog/${slug}`} className={styles.card}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.date}>{date}</p>
        </div>
        <p className={styles.summary}>{summary}</p>
      </Link>
    </article>
  );
}
