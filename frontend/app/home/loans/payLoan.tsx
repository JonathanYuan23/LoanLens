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
import { AxiosAPIError, Loan, PayLoanType } from "types/types";
import { useMutation } from "@tanstack/react-query";
import { payLoanAPI } from "app/api/api";

interface AddLoanDialogProps {
  isPayLoanDialogOpen: boolean;
  onPayLoanDialogClose: () => void;
  refetch: () => void;
}

function PayLoanDialog({
  isPayLoanDialogOpen,
  onPayLoanDialogClose,
  refetch,
}: AddLoanDialogProps) {
  const [loanId, setLoanId] = useState<number | null>(null);
  const [payAmount, setPayAmount] = useState<number | null>(null);

  const onSubmitClick = () => {
    payLoan({ loan_id: loanId!, amount: payAmount! });
  };
  const payLoanMutation = useMutation<Loan, AxiosAPIError, PayLoanType>({
    mutationFn: (data) => payLoanAPI(data),
    onSuccess: () => {
      refetch();
      onPayLoanDialogClose();
    },
    meta: {
      errorMessage: "Error paying a Loan.",
    },
  });

  const payLoan = (data: PayLoanType) => {
    payLoanMutation.mutate(data);
  };

  return (
    <Dialog
      open={isPayLoanDialogOpen}
      onClose={onPayLoanDialogClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Pay Loan</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Pay an amount off of a User's Loan
        </DialogContentText>
        <div className={styles.fields}>
          <TextField
            autoFocus
            inputProps={{ type: "number" }}
            type="number"
            fullWidth
            placeholder="Loan ID"
            value={loanId}
            onChange={(e) => setLoanId(parseInt(e.target.value))}
          />
          <TextField
            inputProps={{ type: "number" }}
            type="number"
            fullWidth
            placeholder="Amount"
            value={payAmount}
            onChange={(e) => setPayAmount(parseInt(e.target.value))}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onPayLoanDialogClose}>Cancel</Button>
        <Button
          disabled={!(loanId && payAmount)}
          onClick={onSubmitClick}
          variant="contained"
          color="primary"
        >
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PayLoanDialog;
