import styles from "./Footer.module.css";

const links = [
  { label: "GitHub", href: "https://github.com/justinli34" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/justinlibc" },
  { label: "YouTube", href: "https://www.youtube.com/@justinli34" },
] as const;

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.updated}>Last updated April 2026</p>
      <nav aria-label="Social links">
        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
