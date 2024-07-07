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
import styles from "./assets.module.scss";
interface Asset {
  asset_type: string;
  asset_value: number;
}

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
          Fetch Assets
        </Button>
      </div>

      {userAssets && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Asset Type</TableCell>
                <TableCell>Asset Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userAssets.map((asset, index) => (
                <TableRow key={index}>
                  <TableCell>{asset.asset_type}</TableCell>
                  <TableCell>{asset.asset_value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default Assets;
