"use client";
import React, { useState } from "react";
import {
  Table,
  TextField,
  Button,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import PayLoanDialog from "./payLoan";

import styles from "./loans.module.scss";
import { getLoans } from "app/api/api";
import { AxiosAPIError, LoansType } from "types/types";
import { useQuery } from "@tanstack/react-query";
import AddLoanDialog from "./addLoan";

// test data
const userLoans: LoansType = {
  total_loan_amount: 22929292,
  loans: [
    {
      id: 1,
      reason: "Mortgage",
      loan_amount: 10000000,
      balance_paid: 600000,
      date_created: "March 2023",
    },
    {
      id: 2,
      reason: "Mortgage",
      loan_amount: 10000000,
      balance_paid: 600000,
      date_created: "March 2023",
    },
    {
      id: 3,
      reason: "Mortgage",
      loan_amount: 10000000,
      balance_paid: 600000,
      date_created: "March 2023",
    },
    {
      id: 4,
      reason: "Mortgage",
      loan_amount: 10000000,
      balance_paid: 600000,
      date_created: "March 2023",
    },
  ],
};

function Loans() {
  const [userId, setUserId] = useState<string>("");

  const [isPayLoanDialogOpen, setIsPayLoanDialogOpen] =
    useState<boolean>(false);
  const [isAddLoanDialogOpen, setIsAddLoanDialogOpen] =
    useState<boolean>(false);

  const onPayLoanDialogClose = () => {
    setIsPayLoanDialogOpen(false);
  };
  const onAddLoanDialogClose = () => {
    setIsAddLoanDialogOpen(false);
  };

  const handleClick = () => {
    refetch();
  };

  const handlePayClick = () => {
    setIsPayLoanDialogOpen(true);
  };
  const handleAddLoanClick = () => {
    setIsAddLoanDialogOpen(true);
  };

  const { isError, data, error, refetch, isLoading } = useQuery<
    LoansType,
    AxiosAPIError
  >({
    queryKey: ["userLoans", userId],
    queryFn: () => getLoans(parseInt(userId)),
    enabled: false,
  });

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.search}>
          <TextField
            size="small"
            id="outlined-basic"
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleClick}>
            Fetch Loans
          </Button>
        </div>
        <div className={styles.options}>
          <Button variant="contained" color="primary" onClick={handlePayClick}>
            Pay Loan
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddLoanClick}
          >
            Add Loan
          </Button>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <TableContainer component={Paper}>
          Loan Summary
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Total Amount in Loans</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4}>Loading...</TableCell>
                </TableRow>
              )}
              {isError && (
                <TableRow>
                  <TableCell colSpan={4}>{error.message}</TableCell>
                </TableRow>
              )}
              {data && (
                <TableRow>
                  <TableCell>{data.total_loan_amount}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer component={Paper}>
          Loan Breakdown
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Loan ID</TableCell>
                <TableCell>Loan Reason</TableCell>
                <TableCell>Loan Amount</TableCell>
                <TableCell>Balance Paid</TableCell>
                <TableCell>Date Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4}>Loading...</TableCell>
                </TableRow>
              )}
              {isError && (
                <TableRow>
                  <TableCell colSpan={4}>{error.message}</TableCell>
                </TableRow>
              )}
              {data &&
                data.loans.map((loan, index) => (
                  <TableRow key={index}>
                    <TableCell>{loan.id}</TableCell>
                    <TableCell>{loan.reason}</TableCell>
                    <TableCell>{loan.loan_amount}</TableCell>
                    <TableCell>{loan.balance_paid}</TableCell>
                    <TableCell>{loan.date_created}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <PayLoanDialog
        isPayLoanDialogOpen={isPayLoanDialogOpen}
        onPayLoanDialogClose={onPayLoanDialogClose}
      />
      <AddLoanDialog
        isAddLoanDialogOpen={isAddLoanDialogOpen}
        onAddLoanDialogClose={onAddLoanDialogClose}
      />
      {/* 
      <Dialog
        open={IsPayLoanDialogOpen}
        onClose={onPayLoanDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Pay Loan</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pay an amount off of a User's Loan
          </DialogContentText>
          <div className={styles.fields}>
            <TextField
              autoFocus
              fullWidth
              placeholder="First Name"
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
      </Dialog> */}
    </div>
  );
}

export default Loans;
