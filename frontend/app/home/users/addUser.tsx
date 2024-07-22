"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import styles from "./users.module.scss";

interface AddUserDialogProps {
  isAddUserDialogOpen: boolean;
  onAddUserDialogClose: () => void;
}

function AddUserDialog({
  isAddUserDialogOpen,
  onAddUserDialogClose,
}: AddUserDialogProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState<dayjs.Dayjs | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const onSubmitClick = () => {
    onAddUserDialogClose();
  };

  return (
    <Dialog
      open={isAddUserDialogOpen}
      onClose={onAddUserDialogClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Pay Loan</DialogTitle>
      <DialogContent>
        <DialogContentText>Add a User to the Database </DialogContentText>
        <div className={styles.fields}>
          <TextField
            autoFocus
            fullWidth
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={styles.fields}>
          <TextField
            fullWidth
            placeholder="City"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <DatePicker
            label="Date of Birth"
            value={dob}
            onChange={(newDob) => setDob(newDob)}
          />
        </div>
        <div className={styles.fields}>
          <TextField
            fullWidth
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <TextField
            fullWidth
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAddUserDialogClose}>Cancel</Button>
        <Button
          disabled={!(name && address && dob && companyName && jobTitle)}
          onClick={onSubmitClick}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddUserDialog;
