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
  Typography,
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
      loan_id: 1,
      reason: "Mortgage",
      loan_amount: 10000000,
      balance_paid: 600000,
      date_created: "March 2023",
    },
    {
      loan_id: 2,
      reason: "Mortgage",
      loan_amount: 10000000,
      balance_paid: 600000,
      date_created: "March 2023",
    },
    {
      loan_id: 3,
      reason: "Mortgage",
      loan_amount: 10000000,
      balance_paid: 600000,
      date_created: "March 2023",
    },
    {
      loan_id: 4,
      reason: "Mortgage",
      loan_amount: 10000000,
      balance_paid: 600000,
      date_created: "March 2023",
    },
  ],
};

function Loans() {
  const [userId, setUserId] = useState<number | null>(null);

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
    queryFn: () => getLoans(userId!),
    enabled: false,
  });

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.search}>
          <TextField
            autoFocus
            inputProps={{ type: "number" }}
            type="number"
            size="small"
            id="outlined-basic"
            label="User ID"
            value={userId}
            onChange={(e) => setUserId(parseInt(e.target.value))}
          />
          <Button variant="contained" color="primary" onClick={handleClick}>
            Fetch Loans
          </Button>
        </div>
        <div className={styles.options}>
          <Button
            variant="contained"
            disabled={!data}
            color="primary"
            onClick={handlePayClick}
          >
            Pay Loan
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddLoanClick}
            disabled={!data}
          >
            Add Loan
          </Button>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <Typography fontSize="16pt"> Loan Summary</Typography>

        <TableContainer component={Paper}>
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
        <Typography fontSize="16pt"> Loans Breakdown</Typography>

        <TableContainer component={Paper}>
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
                    <TableCell>{loan.loan_id}</TableCell>
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
        refetch={refetch}
      />
      <AddLoanDialog
        isAddLoanDialogOpen={isAddLoanDialogOpen}
        onAddLoanDialogClose={onAddLoanDialogClose}
        refetch={refetch}
      />
    </div>
  );
}

export default Loans;
