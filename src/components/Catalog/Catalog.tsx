'use client';

import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import CarCard from '@/components/CarCard/CarCard';
import CarFilters from '@/components/CarFilters/CarFilters';
import { fetchCars, type CarsQueryParams } from '@/services/carService';
import styles from './Catalog.module.css';

type AppliedFilters = Omit<CarsQueryParams, 'page'>;

export default function Catalog() {
  const [filters, setFilters] = useState<AppliedFilters>({});

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['cars', filters],
    queryFn: ({ pageParam }) =>
      fetchCars({
        page: pageParam,
        ...filters,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  return (
    <section className={styles.catalog} aria-label="Available cars">
      <div className={styles.container}>
        <CarFilters onSearch={setFilters} />

        {isPending && <p className={styles.message}>Loading cars...</p>}

        {isError && <p className={styles.message}>Failed to load cars.</p>}

        {!isPending && !isError && cars.length === 0 && (
          <p className={styles.message}>No cars found.</p>
        )}

        {!isPending && !isError && cars.length > 0 && (
          <>
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
                {isFetchingNextPage ? 'Loading...' : 'Load more'}
              </button>
            )}
          </>
        )}
      </div>
    </section>
  );
}
