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
import styles from "./income.module.scss";
interface Income {
  household_income: number;
}

const userIncome: Income = {
  household_income: 110000,
};

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
          Fetch Income
        </Button>
      </div>

      {userIncome && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Household Income</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{userIncome.household_income}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default Loans;
