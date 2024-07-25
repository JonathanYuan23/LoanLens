"use client";
import React, { useState } from "react";

import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Pagination,
} from "@mui/material";
import AddUserDialog from "./addUser";
import styles from "./users.module.scss";
import { useQuery } from "@tanstack/react-query";
import { UserType, AxiosAPIError } from "types/types";
import { getUserAPI } from "app/api/api";

const sampledata: UserType[] = [
  {
    user_id: 1,
    name: "John Doe",
    dob: "1985-04-12",
    address: "123 Elm Street, Apt 4B, Springfield",
    city_name: "Springfield",
    company_name: "Acme Corporation",
    job_title: "Software Engineer",
    income: 75000.0,
  },
  {
    user_id: 2,
    name: "Jane Smith",
    dob: "1990-06-22",
    address: "456 Oak Avenue, Suite 301, Metropolis",
    city_name: "Metropolis",
    company_name: "Beta Inc.",
    job_title: "Marketing Manager",
    income: 85000.0,
  },
  {
    user_id: 3,
    name: "Alice Johnson",
    dob: "1983-11-15",
    address: "789 Pine Road, House 7, Gotham",
    city_name: "Gotham",
    company_name: "Gamma Solutions",
    job_title: "Graphic Designer",
    income: 65000.0,
  },
];

const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [name, setName] = useState("");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] =
    useState<boolean>(false);

  const onAddUserDialogClose = () => {
    setIsAddUserDialogOpen(false);
  };

  const handleAddUserClick = () => {
    setIsAddUserDialogOpen(true);
  };

  const handleClick = () => {
    refetch();
  };

  const { isError, data, error, refetch, isLoading } = useQuery<
    UserType[],
    AxiosAPIError
  >({
    queryKey: ["getUser", name],
    queryFn: () => getUserAPI(name!),
    enabled: false,
  });
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const paginatedData = data
    ? data.slice((page - 1) * rowsPerPage, page * rowsPerPage)
    : [];

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.search}>
          <TextField
            size="small"
            id="outlined-basic"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleClick}>
            Find User
          </Button>
        </div>
        <div className={styles.options}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUserClick}
          >
            Add User
          </Button>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <Typography fontSize="16pt">User's List</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>City</TableCell>
                <TableCell>Job Title</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Income</TableCell>
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
              {paginatedData &&
                paginatedData.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.user_id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.dob}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>{user.city_name}</TableCell>
                    <TableCell>{user.job_title}</TableCell>
                    <TableCell>{user.company_name}</TableCell>
                    <TableCell>{user.income}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil((data?.length || 0) / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          className={styles.pagination}
        />
      </div>

      <AddUserDialog
        isAddUserDialogOpen={isAddUserDialogOpen}
        onAddUserDialogClose={onAddUserDialogClose}
        refetch={refetch}
      />
    </div>
  );
};

export default UsersPage;
