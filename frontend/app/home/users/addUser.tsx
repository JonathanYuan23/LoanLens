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
import { useMutation } from "@tanstack/react-query";
import { AddUserType, AxiosAPIError, User } from "types/types";
import { addUserAPI } from "app/api/api";

interface AddUserDialogProps {
  isAddUserDialogOpen: boolean;
  onAddUserDialogClose: () => void;
  refetch: () => void;
}

function AddUserDialog({
  isAddUserDialogOpen,
  onAddUserDialogClose,
  refetch,
}: AddUserDialogProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState<dayjs.Dayjs | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [cityName, setCityName] = useState("");
  const [income, setIncome] = useState<number | null>(null);
  const [jobTitle, setJobTitle] = useState("");

  const onSubmitClick = () => {
    addUser({
      name,
      address,
      dob: dob!.format("YYYY-MM-DD"),
      company_name: companyName,
      city_name: cityName,
      job_title: jobTitle,
      income: income!,
    });
  };

  const addUserMutation = useMutation<User, AxiosAPIError, AddUserType>({
    mutationFn: (data) => addUserAPI(data),
    onSuccess: () => {
      refetch();
      onAddUserDialogClose();
    },
    meta: {
      errorMessage: "Error adding a User.",
    },
  });

  const addUser = (data: AddUserType) => {
    addUserMutation.mutate(data);
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
          <DatePicker
            label="Date of Birth"
            value={dob}
            onChange={(newDob) => setDob(newDob)}
          />
        </div>
        <div className={styles.fields}>
          <TextField
            fullWidth
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            fullWidth
            placeholder="City"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className={styles.fields}>
          <TextField
            fullWidth
            placeholder="Job Title"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <TextField
            inputProps={{ type: "number" }}
            type="number"
            fullWidth
            placeholder="Income"
            value={income}
            onChange={(e) => setIncome(parseInt(e.target.value))}
          />
        </div>
        <div className={styles.fields}>
          <TextField
            fullWidth
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
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
