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
import styles from "./loans.module.scss";
import { getLoans } from "app/api/api";
import { AxiosAPIError, LoansType } from "types/types";
import { useQuery } from "@tanstack/react-query";

// test data
const userLoans: LoansType = {
  total_loan_amount: 22929292,
  loans: [
    {
      reason: "Mortgage",
      loan_amount: 10000000,
      balance_paid: 600000,
      date_created: "March 2023",
    },
    {
      reason: "Mortgage",
      loan_amount: 10000000,
      balance_paid: 600000,
      date_created: "March 2023",
    },
    {
      reason: "Mortgage",
      loan_amount: 10000000,
      balance_paid: 600000,
      date_created: "March 2023",
    },
    {
      reason: "Mortgage",
      loan_amount: 10000000,
      balance_paid: 600000,
      date_created: "March 2023",
    },
  ],
};

function Loans() {
  const [userId, setUserId] = useState<string>("");

  const handleClick = () => {
    refetch();
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
    </div>
  );
}

export default Loans;
