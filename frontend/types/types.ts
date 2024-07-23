import { AxiosError } from "axios";

type APIError = {
  reason: string;
  code?: string;
};

export type AxiosAPIError = AxiosError<APIError>;

export interface AssetsType {
  total_asset_amount: number;
  assets: Asset[];
}

export interface Asset {
  asset_type: string;
  asset_value: number;
}

export interface LoansType {
  total_loan_amount: number;
  loans: Loan[];
}

export interface Loan {
  loan_id: number;
  reason: string;
  loan_amount: number;
  balance_paid: number;
  date_created: string;
}

export interface PayLoanType {
  userId: number;
  loanId: number;
  amount: number;
}

export interface AddLoanType {
  userId: number;
  reason: string;
  loan_amount: number;
  balance_paid: number;
  date_created: string;
}

export interface AddUserType {
  name: string;
  address: string;
  dob: string;
  companyName: number;
  jobTitle: string;
}
export interface Income {
  household_income: number;
}
