import axios from "axios";
import type { Car, CarsFilters, CarsResponse } from "@/types/car";

const api = axios.create({
  baseURL: "https://car-rental-api.goit.study",
});

export interface CarsQueryParams {
  page: number;
  brand?: string;
  rentalPrice?: number;
  minMileage?: number;
  maxMileage?: number;
}

export async function fetchCars(
  params: CarsQueryParams,
): Promise<CarsResponse> {
  const response = await api.get<CarsResponse>("/cars", {
    params,
  });

  return response.data;
}

export async function fetchCarsFilters(): Promise<CarsFilters> {
  const response = await api.get<CarsFilters>("/cars/filters");

  return response.data;
}

export async function fetchCarById(id: string): Promise<Car> {
  const response = await api.get<Car>(`/cars/${id}`);

  return response.data;
}
