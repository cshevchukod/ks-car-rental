import CarDetails from "@/components/CarDetails/CarDetails";
import { fetchCarById } from "@/services/carService";

interface CarDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { id } = await params;
  const car = await fetchCarById(id);

  return <CarDetails car={car} />;
}
