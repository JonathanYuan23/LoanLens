"use client";
import React, { useEffect, useState } from "react";
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
import styles from "./assets.module.scss";
import { getAssets } from "app/api/api";
import { Asset, AxiosAPIError } from "types/types";
import { useQuery } from "@tanstack/react-query";

const userAssets: Asset[] = [
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
];

function Assets() {
  const [userId, setUserId] = useState<string>("");

  const handleClick = () => {
    refetch();
  };

  const {
    isError,
    data: assets,
    error,
    refetch,
    isLoading,
  } = useQuery<Asset[], AxiosAPIError>({
    queryKey: ["userAssets", userId],
    queryFn: () => getAssets(parseInt(userId)),
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
          Fetch Assets
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset Type</TableCell>
              <TableCell>Asset Value</TableCell>
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
            {assets &&
              assets?.map((asset, index) => (
                <TableRow key={index}>
                  <TableCell>{asset.asset_type}</TableCell>
                  <TableCell>{asset.asset_value}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Assets;
