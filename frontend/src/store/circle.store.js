import { create } from "zustand";

export const useCircleStore = create((set) => ({
  circles: [],
  currentCircle: null,

  setCircles: (circles) => set({ circles }),
  setCurrentCircle: (circle) => set({ currentCircle: circle }),
}));
