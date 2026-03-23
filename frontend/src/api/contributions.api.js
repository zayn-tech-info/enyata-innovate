import api from "./axios";

export const initiatePayment = (data) =>
  api.post("/contributions/initiate", data);

export const verifyPayment = (ref) => api.get(`/contributions/verify/${ref}`);
