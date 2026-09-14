import Image from 'next/image';
import {
  IoCalendarOutline,
  IoCarSportOutline,
  IoCheckmarkCircleOutline,
  IoLocationOutline,
  IoSettingsOutline,
  IoSpeedometerOutline,
  IoWaterOutline,
} from 'react-icons/io5';
import type { Car } from '@/types/car';
import styles from './CarDetails.module.css';
import BookingForm from '@/components/BookingForm/BookingForm';

interface CarDetailsProps {
  car: Car;
}

export default function CarDetails({ car }: CarDetailsProps) {
  const formattedMileage = car.mileage.toLocaleString('uk-UA');

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <Image
            className={styles.image}
            src={car.img}
            alt={`${car.brand} ${car.model}`}
            width={640}
            height={512}
            priority
          />

          <BookingForm carId={car.id} />
        </div>

        <article className={styles.infoCard}>
          <div className={styles.details}>
            <div className={styles.titleBlock}>
              <div className={styles.titleRow}>
                <h1 className={styles.title}>
                  {car.brand} {car.model}, {car.year}
                </h1>

                <span className={styles.article}>
                  Article: {car.stockNumber}
                </span>
              </div>

              <div className={styles.meta}>
                <p className={styles.location}>
                  <IoLocationOutline aria-hidden="true" />
                  <span>
                    {car.location.city}, {car.location.country}
                  </span>
                </p>

                <p className={styles.price}>${car.rentalPrice}</p>
              </div>
            </div>

            <p className={styles.description}>{car.description}</p>
          </div>

          <div className={styles.carInfo}>
            <section className={styles.infoSection}>
              <h2 className={styles.subtitle}>Rental Conditions:</h2>

              <ul className={styles.list}>
                {car.rentalConditions.map((condition) => (
                  <li key={condition} className={styles.listItem}>
                    <IoCheckmarkCircleOutline aria-hidden="true" />
                    <span>{condition}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className={styles.divider} />

            <section className={styles.infoSection}>
              <h2 className={styles.subtitle}>Car Specifications:</h2>

              <ul className={styles.list}>
                <li className={styles.listItem}>
                  <IoCalendarOutline aria-hidden="true" />
                  <span>Year: {car.year}</span>
                </li>

                <li className={styles.listItem}>
                  <IoCarSportOutline aria-hidden="true" />
                  <span>Type: {car.type}</span>
                </li>

                <li className={styles.listItem}>
                  <IoWaterOutline aria-hidden="true" />
                  <span>Fuel Consumption: {car.fuelConsumption}</span>
                </li>

                <li className={styles.listItem}>
                  <IoSettingsOutline aria-hidden="true" />
                  <span>Engine: {car.engine}</span>
                </li>

                <li className={styles.listItem}>
                  <IoSpeedometerOutline aria-hidden="true" />
                  <span>Mileage: {formattedMileage} km</span>
                </li>
              </ul>
            </section>

            <div className={styles.divider} />

            <section className={styles.infoSection}>
              <h2 className={styles.subtitle}>
                Accessories and functionalities:
              </h2>

              <ul className={styles.list}>
                {car.features.map((feature) => (
                  <li key={feature} className={styles.listItem}>
                    <IoCheckmarkCircleOutline aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </article>
      </div>
    </section>
  );
}
