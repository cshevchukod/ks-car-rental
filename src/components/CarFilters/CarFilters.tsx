"use client";

import { Field, Form, Formik } from "formik";
import { useQuery } from "@tanstack/react-query";
import { IoChevronDown } from "react-icons/io5";
import { fetchCarsFilters, type CarsQueryParams } from "@/services/carService";
import styles from "./CarFilters.module.css";

interface CarFiltersProps {
  onSearch: (filters: Omit<CarsQueryParams, "page">) => void;
}

interface FilterValues {
  brand: string;
  price: string;
  minMileage: string;
  maxMileage: string;
}

const initialValues: FilterValues = {
  brand: "",
  price: "",
  minMileage: "",
  maxMileage: "",
};

export default function CarFilters({ onSearch }: CarFiltersProps) {
  const { data: filtersData } = useQuery({
    queryKey: ["carsFilters"],
    queryFn: fetchCarsFilters,
  });

  const brands = filtersData?.brands ?? [];

  const prices = filtersData
    ? Array.from(
        {
          length:
            Math.floor((filtersData.price.max - filtersData.price.min) / 10) +
            1,
        },
        (_, index) => filtersData.price.min + index * 10,
      )
    : [];

  const handleSubmit = (values: FilterValues) => {
    onSearch({
      brand: values.brand || undefined,
      price: values.price ? Number(values.price) : undefined,
      minMileage: values.minMileage ? Number(values.minMileage) : undefined,
      maxMileage: values.maxMileage ? Number(values.maxMileage) : undefined,
    });
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ resetForm, values }) => (
        <Form className={styles.form}>
          <label className={styles.field}>
            <span className={styles.label}>Car brand</span>

            <span className={styles.selectWrapper}>
              <Field as="select" name="brand" className={styles.select}>
                <option value="">Choose a brand</option>

                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </Field>

              <IoChevronDown className={styles.chevron} aria-hidden="true" />
            </span>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Price/ 1 hour</span>

            <span className={styles.selectWrapper}>
              <span className={styles.priceValue} aria-hidden="true">
                {values.price ? `To $${values.price}` : "Choose a price"}
              </span>

              <Field
                as="select"
                name="price"
                className={`${styles.select} ${styles.priceSelect}`}
                aria-label="Price per hour"
              >
                <option value="">Choose a price</option>

                {prices.map((price) => (
                  <option key={price} value={price}>
                    {price}
                  </option>
                ))}
              </Field>

              <IoChevronDown className={styles.chevron} aria-hidden="true" />
            </span>
          </label>

          <div className={styles.field}>
            <span className={styles.label}>Car mileage / km</span>

            <div className={styles.mileageInputs}>
              <Field
                type="number"
                name="minMileage"
                min="0"
                placeholder="From"
                className={styles.mileageInput}
                aria-label="Minimum mileage"
              />

              <Field
                type="number"
                name="maxMileage"
                min="0"
                placeholder="To"
                className={styles.mileageInput}
                aria-label="Maximum mileage"
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.searchButton}>
              Search
            </button>

            <button
              type="button"
              className={styles.clearButton}
              onClick={() => {
                resetForm();
                onSearch({});
              }}
            >
              Clear filters
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
