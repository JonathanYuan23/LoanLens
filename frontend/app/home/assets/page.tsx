"use client";
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
import React, { useState } from "react";

interface Asset {
  asset_type: string;
  asset_value: number;
}

function Assets() {
  const [userId, setUserId] = useState<number>();
  const [userAssets, setUserAssets] = useState<Asset[] | null>(null);

  const handleFetchAssets = async () => {
    try {
      const response = await fetch(`/total-assets/${userId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setUserAssets(jsonData.assets);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="User ID"
        value={userId}
        onChange={(e) => setUserId(parseInt(e.target.value))}
      />
      <Button variant="contained" color="primary" onClick={handleFetchAssets}>
        Fetch Assets
      </Button>

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
