import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/types/car";
import styles from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const formattedMileage = car.mileage.toLocaleString("uk-UA");

  return (
    <article className={styles.card}>
      <Image
        className={styles.image}
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        width={244}
        height={268}
      />

      <div className={styles.heading}>
        <h2 className={styles.title}>
          {car.brand} <span className={styles.model}>{car.model}</span>,{" "}
          {car.year}
        </h2>

        <p className={styles.price}>${car.rentalPrice}</p>
      </div>

      <div className={styles.details}>
        <div className={styles.row}>
          <span>{car.location.city}</span>
          <span>{car.location.country}</span>
          <span className={styles.company}>{car.rentalCompany}</span>
        </div>

        <div className={styles.row}>
          <span>{car.type}</span>
          <span>{formattedMileage} km</span>
        </div>
      </div>

      <Link
        href={`/catalog/${car.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
      >
        Read more
      </Link>
    </article>
  );
}
