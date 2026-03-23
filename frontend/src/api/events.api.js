import api from "./axios";

// ---------------------------
// Mock data
// ---------------------------
const mockCircles = [
  { _id: "1", name: "Friends Circle", escrowBalance: 5000 },
  { _id: "2", name: "Work Circle", escrowBalance: 12000 },
];

const mockEvents = [
  {
    _id: "101",
    title: "Birthday Party",
    collectedAmount: 2000,
    targetAmount: 5000,
    status: "open",
  },
  {
    _id: "102",
    title: "Office Fundraiser",
    collectedAmount: 5000,
    targetAmount: 10000,
    status: "closed",
  },
];

// ---------------------------
// Mock toggle
// ---------------------------
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

// ---------------------------
// Circles API
// ---------------------------
export const getCircles = () => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: mockCircles }), 500);
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

// ---------------------------
// Events API
// ---------------------------
export const getEvents = () => {
  if (USE_MOCK) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ data: mockEvents }), 500);
    });
  }
  return api.get("/events");
};

export const createEvent = (data) => {
  if (USE_MOCK) {
    return new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            data: { _id: Date.now().toString(), ...data },
          }),
        500,
      ),
    );
  }
  return api.post("/events", data);
};

export const getEvent = (id) => {
  if (USE_MOCK) {
    const event = mockEvents.find((e) => e._id === id);
    return Promise.resolve({ data: event || null });
  }
  return api.get(`/events/${id}`);
};
