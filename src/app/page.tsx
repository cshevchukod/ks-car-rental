import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import Catalog from '@/components/Catalog/Catalog';
import { fetchCars, fetchCarsFilters } from '@/services/carService';

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.infiniteQuery({
      queryKey: ['cars', {}],
      queryFn: ({ pageParam }) =>
        fetchCars({
          page: pageParam,
        }),
      initialPageParam: 1,
    }),

    queryClient.query({
      queryKey: ['carsFilters'],
      queryFn: fetchCarsFilters,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Catalog />
    </HydrationBoundary>
  );
}
