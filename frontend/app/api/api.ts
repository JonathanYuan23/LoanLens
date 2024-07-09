import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:5000/api", // Base URL for your Flask backend
});

export const getAssets = async (userID: number) => {
  const res = await api.get(`/total-assets/${userID}`);
  return res.data.assets;
};

export const getLoans = async (userID: number) => {
  const res = await api.get(`/loan-history/${userID}`);
  return res.data.loans;
};

export const getHouseholdIncome = async (userID: number) => {
  const res = await api.get(`/household-income/${userID}`);
  return res.data;
};