import type { Metadata } from "next";
import Catalog from "@/components/Catalog/Catalog";

export const metadata: Metadata = {
  title: "Catalog | RentalCar",
  description: "Browse available rental cars",
};

export default function CatalogPage() {
  return (
    <main>
      <Catalog />
    </main>
  );
}
