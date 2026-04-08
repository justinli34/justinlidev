import styles from "./ExperienceCard.module.css";

type ExperienceCardProps = {
  role: string;
  company: string;
  description: string;
};

export default function ExperienceCard({ role, company, description }: ExperienceCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.role}>{role}</h3>
        <span className={styles.company}>{company}</span>
      </div>
      <p className={styles.description}>{description}</p>
    </article>
  );
}
