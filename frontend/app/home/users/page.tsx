"use client";
import React, { useState } from "react";

import { Button } from "@mui/material";
import AddUserDialog from "./addUser";
import styles from "./users.module.scss";

const UsersPage = () => {
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] =
    useState<boolean>(false);

  const onAddUserDialogClose = () => {
    setIsAddUserDialogOpen(false);
  };

  const handleAddUserClick = () => {
    setIsAddUserDialogOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.search}>
          {/* <TextField
            size="small"
            id="outlined-basic"
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleClick}>
            Find User
          </Button> */}
        </div>
        <div className={styles.options}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUserClick}
          >
            Add User
          </Button>
        </div>
      </div>

      <AddUserDialog
        isAddUserDialogOpen={isAddUserDialogOpen}
        onAddUserDialogClose={onAddUserDialogClose}
      />
    </div>
  );
};

export default UsersPage;
