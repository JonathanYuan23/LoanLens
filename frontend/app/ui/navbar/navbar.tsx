"use client";
import React from "react";

import { usePathname } from "next/navigation";
import styles from "./navbar.module.scss";
import { Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
function Navbar() {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      {/* <div className={styles.title}>{pathname.split("/").pop()}</div> */}
      <div className={styles.menu}>
        <div className={styles.search}>
          <SearchIcon />
          <TextField
            className={styles.input}
            sx={{
              color: "white",
              input: { color: "white" },
              label: { color: "white" },
              outline: { color: "white" },
            }}
            id="outlined-basic"
            size="small"
            label="Search"
            variant="outlined"
          />
        </div>
        <Button variant="contained">Search</Button>
      </div>
    </div>
  );
}

export default Navbar;
