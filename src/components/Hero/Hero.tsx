import Image from "next/image";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Image
        className={styles.image}
        src="/hero-main.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
      />

      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.text}>
          <h1 className={styles.title}>Find your perfect rental car</h1>
          <p className={styles.subtitle}>
            Reliable and budget-friendly rentals for any journey
          </p>
        </div>

        <Link href="/catalog" className={styles.button}>
          View Catalog
        </Link>
      </div>
    </section>
  );
}
