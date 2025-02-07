import { create } from "zustand";
import { AUTH_URL } from "../lib/config";
import http from "../services/http-base";

const useAuthStore = create((set) => ({
  // isVerified: false,
  isAuthenticated: false,
  setIsAuthenticated: (value) => set(() => ({ isAuthenticated: value })),

  login: () => {
    try {
      const url = window.location.href
      return (
        window.location.href = `${AUTH_URL}/auth/login?url=` + encodeURIComponent(url)
      );

    } catch (err) {
      console.log("Error when logging in: ", err);
      set((state) => ({
        isAuthenticated: false,
      }));
    }
  },

  // login: () => {
  //   try {
  //     const url = window.location.href
  //     const result = fetch(`${AUTH_URL}/auth/login&url=` + encodeURIComponent(url))
  //     .then(async response => await response.json());

  //     return result;

  //   } catch (err) {
  //     console.log("Error when logging in: ", err);
  //     set((state) => ({
  //       isAuthenticated: false,
  //     }));
  //   }
  // },

  user: null,
  setUser:(value) => set(() => ({ user: value })),
  getUser: async () => {
    console.log("in getUser method")
    try {
      
      const response = await http.get(`/auth/user`); // AUTH SSO

      console.log("USER SSO >>", response);
      set((state) => ({
        // user: (state.user = userInfo),
        user: (state.user = response.data.user),
        isAuthenticated: true //  response.data.isAuthenticated,
      }));
    } catch (error) {
      console.log("Error when getting the user: ", error);
      set((state) => ({
        // user: (state.user = userInfo),
        user: (state.user = null),
        // isAuthenticated: false,
      }));
    }
  },

  logout: async () => {
    try {
      console.log(">>> LOGGING OUT");

      set((state) => ({
        user: (state.user = null),
        isAuthenticated: false,
      }));

      return (window.location.href = `${AUTH_URL}/auth/logout`);
    } catch (err) {
      console.log("Error when loging out: ", err);
    }
  },
}));

export default useAuthStore;
