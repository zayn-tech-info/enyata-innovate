// auth.store.js
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: true, // start in loading state

  // Initialize auth from localStorage (simulate hydration)
  initAuth: () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      set({ token, user });
    }

    set({ isLoading: false });
  },

  setAuth: (data) => {
    // console.log(`User: ${JSON.stringify(data.data.user, null, 2)} ${JSON.stringify(data)}`)
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.data.user));
    set({
      user: data.data.user,
      token: data.token,
      isLoading: false,
    });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      user: null,
      token: null,
      isLoading: false,
    });
  },
}));
