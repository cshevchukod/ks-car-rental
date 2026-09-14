import styles from './loading.module.css';

export default function CarDetailsLoading() {
  return (
    <main
      className={styles.page}
      aria-label="Loading car details"
      aria-busy="true"
    >
      <span className={styles.visuallyHidden}>Loading car details...</span>

      <div className={styles.container} aria-hidden="true">
        <div className={styles.leftColumn}>
          <div className={`${styles.skeleton} ${styles.image}`} />
          <div className={`${styles.skeleton} ${styles.form}`} />
        </div>

        <div className={`${styles.skeleton} ${styles.infoCard}`} />
      </div>
    </main>
  );
}
