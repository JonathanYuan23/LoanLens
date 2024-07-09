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
import { AxiosAPIError, Income } from "types/types";
import { getHouseholdIncome } from "app/api/api";
import { useQuery } from "@tanstack/react-query";

const userIncome: Income = {
  household_income: 110000,
};

function Loans() {
  const [userId, setUserId] = useState<string>("");

  const handleClick = () => {
    refetch();
  };

  const { isError, data, error, refetch, isFetching } = useQuery<
    Income[],
    AxiosAPIError
  >({
    queryKey: ["userIncome", userId],
    queryFn: () => getHouseholdIncome(parseInt(userId)),
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
          Fetch Income
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Household Income</TableCell>
            </TableRow>
          </TableHead>
          {isFetching && <TableRow>Loading...</TableRow>}
          {isError && <TableRow>{error.message}</TableRow>}
          {data && (
            <TableBody>
              {data.map((income, index) => (
                <TableRow key={index}>
                  <TableCell>{income.household_income}</TableCell>
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
