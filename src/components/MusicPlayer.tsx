import styles from "./MusicPlayer.module.css";

type MusicPlayerProps = {
  src: string;
  title?: string;
};

function toPublicPath(src: string) {
  return src.startsWith("/") ? src : `/${src}`;
}

export default function MusicPlayer({ src, title }: MusicPlayerProps) {
  return (
    <figure className={styles.player}>
      {title ? <figcaption className={styles.title}>{title}</figcaption> : null}
      <audio className={styles.audio} controls preload="metadata" src={toPublicPath(src)} />
    </figure>
  );
}
