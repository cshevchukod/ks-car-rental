import Link from 'next/link';
import styles from './not-found.module.css';

export default function CarNotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>Car not found</h1>

        <p className={styles.text}>
          The requested car does not exist or is no longer available.
        </p>

        <Link href="/catalog" className={styles.link}>
          Back to catalog
        </Link>
      </div>
    </main>
  );
}
