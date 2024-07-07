"use client";

import Link from "next/link";
import styles from "./menuLink.module.scss";
import { usePathname } from "next/navigation";

const MenuLink = ({ item }: any) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`${styles.container} ${
        pathname === item.path && styles.active
      }`}
    >
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink;
