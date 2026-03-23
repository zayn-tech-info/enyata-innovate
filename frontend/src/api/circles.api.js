import api from "./axios";

// Mock data
const mockCircles = [
  { _id: "1", name: "Friends Circle", escrowBalance: 5000 },
  { _id: "2", name: "Work Circle", escrowBalance: 12000 },
];

// Use a flag or environment variable
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const getCircles = () => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: mockCircles }), 500); // simulate network delay
    });
  }
  return api.get("/circles");
};

export const createCircle = (data) => {
  if (USE_MOCK) {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            data: { _id: Date.now().toString(), ...data, escrowBalance: 0 },
          }),
        500,
      ),
    );
  }
  return api.post("/circles", data);
};

export const getCircle = (id) => {
  if (USE_MOCK) {
    const circle = mockCircles.find((c) => c._id === id);
    return Promise.resolve({ data: circle || null });
  }
  return api.get(`/circles/${id}`);
};

export const joinCircle = (id, code) => {
  if (USE_MOCK) {
    return Promise.resolve({ data: { success: true } });
  }
  return api.post(`/circles/${id}/join`, { code });
};
