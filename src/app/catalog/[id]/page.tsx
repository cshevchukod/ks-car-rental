import { cache } from 'react';
import type { Metadata } from 'next';
import axios from 'axios';
import { notFound } from 'next/navigation';
import CarDetails from '@/components/CarDetails/CarDetails';
import { fetchCarById } from '@/services/carService';

interface CarDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getCar = cache(async (id: string) => {
  try {
    return await fetchCarById(id);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }

    throw error;
  }
});

export async function generateMetadata({
  params,
}: CarDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const car = await getCar(id);

  const title = `${car.brand} ${car.model}, ${car.year} | RentalCar`;

  return {
    title,
    description: car.description,
    openGraph: {
      title,
      description: car.description,
      images: [
        {
          url: car.img,
          alt: `${car.brand} ${car.model}`,
        },
      ],
    },
  };
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { id } = await params;
  const car = await getCar(id);

  return <CarDetails car={car} />;
}
