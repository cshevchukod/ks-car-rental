'use client';

import Link from 'next/link';
import styles from './error.module.css';

interface CarDetailsErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function CarDetailsError({ reset }: CarDetailsErrorProps) {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>Something went wrong</h1>

        <p className={styles.text}>
          We could not load the car information. Please try again.
        </p>

        <div className={styles.actions}>
          <button type="button" className={styles.retryButton} onClick={reset}>
            Try again
          </button>

          <Link href="/catalog" className={styles.catalogLink}>
            Back to catalog
          </Link>
        </div>
      </div>
    </main>
  );
}
