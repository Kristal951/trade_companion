import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const Backend_Uri = process.env.REACT_APP_BACKEND_URL;

const useAuthStore = create(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: false,
      errorMsg: "",

      signUp: async ({ name, email, password, age, type }) => {
        set({ loading: true, error: false, errorMsg: "" });

        try {
          const res = await axios.post(
            `${Backend_Uri}/api/user/register`,
            { name, email, password, age, type },
            { withCredentials: true }
          );

          if (res.data.success) {
            set({
              user: null,
              isAuthenticated: true,
              error: false,
              errorMsg: "",
            });
            return { success: true };
          }
        } catch (err) {
          const message = err.response?.data?.error || err.message;
          set({ error: true, errorMsg: message });
          return { success: false, message };
        } finally {
          set({ loading: false });
        }
      },

      handleCheckout: async ({ selectedPlan, paymentMethod, navigate }) => {
        set({ loading: true, error: false, errorMsg: "" });

        try {
          const res = await axios.post(
            `${Backend_Uri}/api/stripe/create-checkout-session`,
            { selectedPlan, paymentMethod },
            { withCredentials: true }
          );

          if (paymentMethod === "stripe") {
            window.location.href = res.data.url; // redirect to Stripe
          } else {
            alert(
              `Bank Transfer Selected:\n\nSend payment to:\n${res.data.bankDetails.accountName}\n${res.data.bankDetails.bankName}\nAcct: ${res.data.bankDetails.accountNumber}\nRef: ${res.data.bankDetails.reference}`
            );
            navigate("/payment-pending");
          }

          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || error.message;
          set({ error: true, errorMsg: message });
          return { success: false, message };
        } finally {
          set({ loading: false });
        }
      },

      verifyEmailCode: async (code) => {
        set({ loading: true, error: false, errorMsg: "" });
        try {
          const { data } = await axios.post(
            `${Backend_Uri}/api/user/verify-email`,
            { code },
            { withCredentials: true }
          );

          set({
            user: data.user || null,
            isAuthenticated: true,
            error: false,
            errorMsg: "",
          });

          return { success: true };
        } catch (error) {
          const message = error.response?.data?.error || error.message;
          set({ error: true, errorMsg: message });
          return { success: false, message };
        } finally {
          set({ loading: false });
        }
      },

      signInUserWithGoogle: async (token) => {
        set({ loading: true, error: false, errorMsg: "" });

        try {
          const { data } = await axios.post(
            `${Backend_Uri}/api/user/google_login`,
            { token },
            { withCredentials: true }
          );
          set({
            user: data.user || null,
            isAuthenticated: true,
            error: false,
            errorMsg: "",
          });

          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || error.message;
          set({ error: true, errorMsg: message });
          return { success: false, message };
        } finally {
          set({ loading: false });
        }
      },

      loginUser: async ({ email, password }) => {
        set({ loading: true, error: false, errorMsg: "" });

        try {
          const { data } = await axios.post(
            `${Backend_Uri}/api/user/login`,
            { email, password },
            { withCredentials: true }
          );

          set({
            user: data.user || null,
            isAuthenticated: true,
            error: false,
            errorMsg: "",
          });

          return { success: true };
        } catch (error) {
          const message = error.response?.data?.message || error.message;
          set({ error: true, errorMsg: message });
          return { success: false, message };
        } finally {
          set({ loading: false });
        }
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
        axios.post(
          `${Backend_Uri}/api/user/logout`,
          {},
          { withCredentials: true }
        );
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => sessionStorage,
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
