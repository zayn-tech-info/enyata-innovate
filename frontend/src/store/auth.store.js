// auth.store.js
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: true, // start in loading state

  // Initialize auth from localStorage (simulate hydration)
  initAuth: () => {
    const token = localStorage.getItem("token");

    if (token) {
      set({ token });
      // optionally fetch user here
      // await fetchUser()
    }

    set({ isLoading: false });
  },

  setAuth: (data) => {
    localStorage.setItem("token", data.token);
    set({
      user: data.user,
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
