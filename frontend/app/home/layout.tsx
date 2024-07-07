import React, { ReactNode } from "react";
import Sidebar from "../ui/home/sidebar/sidebar";
import Navbar from "../ui/navbar/navbar";
import styles from "../ui/home/home.module.scss";

interface DashboardLayoutProps {
  children: ReactNode;
}
const Layout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        {/* <Navbar /> */}
        {children}
      </div>
    </div>
  );
};

export default Layout;
