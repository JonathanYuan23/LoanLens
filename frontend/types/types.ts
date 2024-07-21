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
  reason: string;
  loan_amount: number;
  balance_paid: number;
  date_created: string;
}

export interface Income {
  household_income: number;
}
