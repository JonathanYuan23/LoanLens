import { AddLoanType, PayLoanType } from "types/types";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api", // Base URL for your Flask backend
});

export const getAssets = async (userID: number) => {
  const res = await api.get(`/total-assets/${userID}`);
  return res.data;
};

export const getLoans = async (userID: number) => {
  const res = await api.get(`/loan-history/${userID}`);
  return res.data;
};

export const payLoanAPI = async (data: PayLoanType) => {
  const res = await api.put(`/pay-loan/`, data);
  return res.data;
};
export const addLoanAPI = async (data: AddLoanType) => {
  const res = await api.post(`/new-loan/`, data);
  return res.data;
};

export const getHouseholdIncome = async (userID: number) => {
  const res = await api.get(`/household-income/${userID}`);
  return res.data;
};
