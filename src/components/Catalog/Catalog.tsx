"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import CarCard from "@/components/CarCard/CarCard";
import { fetchCars } from "@/services/carService";
import styles from "./Catalog.module.css";

export default function Catalog() {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars"],
    queryFn: ({ pageParam }) =>
      fetchCars({
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });

  if (isPending) {
    return <p className={styles.message}>Loading cars...</p>;
  }

  if (isError) {
    return <p className={styles.message}>Failed to load cars.</p>;
  }

  const cars = data.pages.flatMap((page) => page.cars);

  return (
    <section className={styles.catalog} aria-label="Available cars">
      <div className={styles.container}>
        <ul className={styles.list}>
          {cars.map((car) => (
            <li key={car.id}>
              <CarCard car={car} />
            </li>
          ))}
        </ul>

        {hasNextPage && (
          <button
            type="button"
            className={styles.loadMore}
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </section>
  );
}
