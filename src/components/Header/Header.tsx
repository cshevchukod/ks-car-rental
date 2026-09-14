"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const isCatalogPage = pathname.startsWith("/catalog");

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} aria-label="RentalCar home">
          <Image
            src="/logo.svg"
            alt="RentalCar"
            width={104}
            height={16}
            unoptimized
          />
        </Link>

        <nav aria-label="Main navigation">
          <ul className={styles.navigation}>
            <li>
              <Link
                href="/"
                className={`${styles.navLink} ${
                  pathname === "/" ? styles.active : ""
                }`}
                aria-current={pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/catalog"
                className={`${styles.navLink} ${
                  isCatalogPage ? styles.active : ""
                }`}
                aria-current={isCatalogPage ? "page" : undefined}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
