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
import { AxiosAPIError, Loan } from "types/types";
import { useQuery } from "@tanstack/react-query";

const userLoans: Loan[] = [
  {
    reason: "Mortgage",
    amount: 10000000,
    balance_paid: 600000,
    date_created: "March 2023",
  },
  {
    reason: "Mortgage",
    amount: 10000000,
    balance_paid: 600000,
    date_created: "March 2023",
  },
  {
    reason: "Mortgage",
    amount: 10000000,
    balance_paid: 600000,
    date_created: "March 2023",
  },
  {
    reason: "Mortgage",
    amount: 10000000,
    balance_paid: 600000,
    date_created: "March 2023",
  },
];

function Loans() {
  const [userId, setUserId] = useState<string>("");

  const handleClick = () => {
    refetch();
  };

  const { isError, data, error, refetch, isFetching } = useQuery<
    Loan[],
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

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Loan Reason</TableCell>
              <TableCell>Loan Amount</TableCell>
              <TableCell>Balance Paid</TableCell>
              <TableCell>Date Created</TableCell>
            </TableRow>
          </TableHead>
          {isFetching && <p>Loading...</p>}
          {isError && <p>{error.message}</p>}
          {data && (
            <TableBody>
              {data.map((loan, index) => (
                <TableRow key={index}>
                  <TableCell>{loan.reason}</TableCell>
                  <TableCell>{loan.amount}</TableCell>
                  <TableCell>{loan.balance_paid}</TableCell>
                  <TableCell>{loan.date_created}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
}

export default Loans;
