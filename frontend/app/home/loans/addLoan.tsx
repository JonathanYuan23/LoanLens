import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import styles from "./loans.module.scss";
import { AxiosAPIError, Loan, AddLoanType } from "types/types";
import { useMutation } from "@tanstack/react-query";
import { addLoanAPI } from "app/api/api";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker/DatePicker";

interface AddLoanDialogProps {
  isAddLoanDialogOpen: boolean;
  onAddLoanDialogClose: () => void;
  refetch: () => void;
}

function AddLoanDialog({
  isAddLoanDialogOpen,
  onAddLoanDialogClose,
  refetch,
}: AddLoanDialogProps) {
  const [userId, setUserId] = useState<number | null>(null);
  const [reason, setReason] = useState("");
  const [loanAmount, setLoanAmount] = useState<number | null>(null);
  const [balancePaid, setBalancePaid] = useState<number | null>(null);
  const [dateCreated, setDateCreated] = useState<dayjs.Dayjs | null>(null);

  const onSubmitClick = () => {
    AddLoan({
      user_id: userId!,
      loan_reason: reason,
      loan_amount: loanAmount!,
      balance_paid: balancePaid!,
      date_created: dateCreated!.format("ddd, DD MMM YYYY HH:mm:ss [GMT]"),
    });
  };
  const addLoanMutation = useMutation<Loan, AxiosAPIError, AddLoanType>({
    mutationFn: (data) => addLoanAPI(data),
    onSuccess: () => {
      refetch();
      onAddLoanDialogClose();
    },
    meta: {
      errorMessage: "Error adding a Loan.",
    },
  });

  const AddLoan = (data: AddLoanType) => {
    addLoanMutation.mutate(data);
  };

  return (
    <Dialog
      open={isAddLoanDialogOpen}
      onClose={onAddLoanDialogClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add Loan</DialogTitle>
      <DialogContent>
        <DialogContentText>Add a Loan to a User</DialogContentText>
        <div className={styles.fields}>
          <TextField
            autoFocus
            inputProps={{ type: "number" }}
            type="number"
            fullWidth
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(parseInt(e.target.value))}
          />
          <DatePicker
            label="Date Created"
            value={dateCreated}
            onChange={(newDateCreated) => setDateCreated(newDateCreated)}
          />
        </div>
        <div className={styles.fields}>
          <TextField
            fullWidth
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <div className={styles.fields}>
          <TextField
            inputProps={{ type: "number" }}
            type="number"
            fullWidth
            placeholder="Loan Amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(parseInt(e.target.value))}
          />
          <TextField
            inputProps={{ type: "number" }}
            type="number"
            fullWidth
            placeholder="Balance Paid"
            value={balancePaid}
            onChange={(e) => setBalancePaid(parseInt(e.target.value))}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAddLoanDialogClose}>Cancel</Button>
        <Button
          disabled={
            !(userId && loanAmount && reason && dateCreated && balancePaid)
          }
          onClick={onSubmitClick}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddLoanDialog;
