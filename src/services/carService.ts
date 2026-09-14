import axios from "axios";
import type { Car, CarsFilters, CarsResponse } from "@/types/car";

const api = axios.create({
  baseURL: "https://car-rental-api.goit.study",
});

export interface CarsQueryParams {
  page: number;
  brand?: string;
  price?: number;
  minMileage?: number;
  maxMileage?: number;
}

export interface BookingRequest {
  name: string;
  email: string;
  comment: string;
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

export async function createBookingRequest(
  carId: string,
  data: BookingRequest,
) {
  const response = await api.post(`/cars/${carId}/booking-requests`, data);

  return response.data;
}
