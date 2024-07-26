import React, { useState } from "react";

import styles from "./loans.module.scss";
import { useQuery } from "@tanstack/react-query";
import { AxiosAPIError, LoanApprovalType } from "types/types";
import { getApprovalRatingAPI } from "app/api/api";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import classNames from "classnames";

interface ApprovalDialogProps {
  isApprovalDialogOpen: boolean;
  onApprovalDialogClose: () => void;
}

const test = 0.3;

function ApprovalDialog({
  isApprovalDialogOpen,
  onApprovalDialogClose,
}: ApprovalDialogProps) {
  const [user_id, setUser_id] = useState<number | null>(null);
  const [loan_amount, setLoan_amount] = useState<number | null>(null);

  const onSubmitClick = () => {
    refetch();
  };

  const { isError, data, error, refetch, isLoading } = useQuery<
    LoanApprovalType,
    AxiosAPIError,
    number
  >({
    queryKey: ["loanApproval", user_id],
    queryFn: () =>
      getApprovalRatingAPI({ user_id: user_id!, loan_amount: loan_amount! }),
    enabled: false,
  });

  return (
    <Dialog
      open={isApprovalDialogOpen}
      onClose={onApprovalDialogClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Loan Approval Rating</DialogTitle>
      <DialogContent>
        <DialogContentText>Loan Computation Analysis</DialogContentText>
        <div className={styles.fields}>
          <TextField
            autoFocus
            inputProps={{ type: "number" }}
            type="number"
            fullWidth
            placeholder="User ID"
            value={user_id}
            onChange={(e) => setUser_id(parseInt(e.target.value))}
          />
          <TextField
            inputProps={{ type: "number" }}
            type="number"
            fullWidth
            placeholder="Desired Loan Amount"
            value={loan_amount}
            onChange={(e) => setLoan_amount(parseInt(e.target.value))}
          />
        </div>

        <div className={styles.approval}>
          {isLoading && <CircularProgress />}
          {isError && <Typography>{error.message}</Typography>}
          {data && (
            <Typography
              className={classNames(styles.rating, {
                [styles.low_rating]: data < 0.5,
                [styles.mid_rating]: data >= 0.5 && data < 0.7,
                [styles.high_rating]: data >= 0.7,
              })}
            >
              {data.toFixed(2)}%
            </Typography>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onApprovalDialogClose}>Close</Button>
        <Button
          disabled={!(user_id && loan_amount)}
          onClick={onSubmitClick}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ApprovalDialog;
