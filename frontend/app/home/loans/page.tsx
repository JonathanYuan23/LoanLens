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
interface Loan {
  reason: string;
  amount: number;
  balance_paid: number;
  date_created: string;
}

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
  const [userId, setUserId] = useState<number>();
  // const [userAssets, setUserAssets] = useState<Asset[] | null>(null);

  // const handleFetchAssets = async () => {
  //   try {
  //     const response = await fetch(`/total-assets/${userId}`);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const jsonData = await response.json();
  //     setUserAssets(jsonData.assets);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <TextField
          size="small"
          id="outlined-basic"
          label="User ID"
          value={userId}
          onChange={(e) => setUserId(parseInt(e.target.value))}
        />
        <Button
          variant="contained"
          color="primary"
          // onClick={handleFetchAssets}
        >
          Fetch Loans
        </Button>
      </div>

      {userLoans && (
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
            <TableBody>
              {userLoans.map((loan, index) => (
                <TableRow key={index}>
                  <TableCell>{loan.reason}</TableCell>
                  <TableCell>{loan.amount}</TableCell>
                  <TableCell>{loan.balance_paid}</TableCell>
                  <TableCell>{loan.date_created}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default Loans;
