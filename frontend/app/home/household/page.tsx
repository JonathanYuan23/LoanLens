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
import styles from "./household.module.scss";
import { getHouseholdAPI } from "app/api/api";
import { AssetsType, AxiosAPIError, HouseholdMemberType } from "types/types";
import { useQuery } from "@tanstack/react-query";

// test data
const userAssets: AssetsType = {
  total_asset_amount: 12342334,
  assets: [
    {
      asset_type: "Car",
      asset_value: 10000,
    },
    {
      asset_type: "Savings",
      asset_value: 2000,
    },
    {
      asset_type: "House",
      asset_value: 100000,
    },
    {
      asset_type: "Watch",
      asset_value: 4000,
    },
  ],
};

function Household() {
  const [userId, setUserId] = useState<string>("");

  const handleClick = () => {
    refetch();
    console.log(data);
  };

  const { isError, data, error, refetch, isLoading } = useQuery<
    HouseholdMemberType[],
    AxiosAPIError
  >({
    queryKey: ["userHousehold", userId],
    queryFn: () => getHouseholdAPI(parseInt(userId)),
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
          Fetch
        </Button>
      </div>

      <div className={styles.tableContainer}>
        <Typography fontSize="16pt"> Household Members</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={2}>Loading...</TableCell>
                </TableRow>
              )}
              {isError && (
                <TableRow>
                  <TableCell colSpan={2}>{error.message}</TableCell>
                </TableRow>
              )}
              {data &&
                data.map((member, index) => (
                  <TableRow key={index}>
                    <TableCell>{member.user_id}</TableCell>
                    <TableCell>{member.name}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Household;
