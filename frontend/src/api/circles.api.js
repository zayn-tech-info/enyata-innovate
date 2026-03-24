import api from "./axios";

// Use a flag or environment variable
export const getCircles = () => {
  return api.get("/circles");
};

export const createCircle = (data) => {
  return api.post("/circles", data);
};

export const getCircle = (id) => {
  return api.get(`/circles/${id}`);
};

export const joinCircle = (id, code) => {
  return api.post(`/circles/${id}/join`, { code });
};
