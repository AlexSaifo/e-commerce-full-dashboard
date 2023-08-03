// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APP_BASE_URL } from "../../index";

const initialState = {
  user: JSON.parse(localStorage.getItem("alexAuth"))?.user || null,
  token: JSON.parse(localStorage.getItem("alexAuth"))?.token || null,
  error: null,
  status: null,
  resetPassword: false,
};

export const isTokenValid = async (token) => {
  if (!token) {
    return false; // Token is not provided
  }

  try {
    const response = await axios.post(`${APP_BASE_URL}/check-token/${token}`);

    if (response.data.valid) {
      return true; // Token is valid
    } else {
      return false; // Token is invalid
    }
  } catch (error) {
    return false; // Error occurred while checking token
  }
};

export const login = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const response = await axios.post(`${APP_BASE_URL}/userLogin`, credentials);
    const user = response.data.data;
    const token = user.token;
    console.log(response.data.data);

    if (+user?.role_id == 1 || +user?.role_id == 2 || +user?.role_id == 3) {
      return {
        user,
        token,
      };
    } else {
      throw Error("You do not have permission to access the site");
    }
  } catch (error) {
    // eslint-disable-next-line eqeqeq

    let errors = "";

    if (error?.response?.data?.errors) {
      let email = error?.response?.data?.errors?.email || "";
      let password = error?.response?.data?.errors?.password || "";

      errors = `${email}${email && password && "\n"}${password}`;
    } else if (error?.response?.data?.message) {
      errors = error?.response?.data?.message;
    } else {
      errors = error.message;
    }

    console.log(error);
    throw Error(errors);
  }
});

export const resetPasswordSendEmail = createAsyncThunk(
  "auth/resetPasswordSendEmail",
  async (data) => {
    try {
      const response = await axios.post(
        `${APP_BASE_URL}/password/reset/send-email`,
        data
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data) => {
    try {
      const response = await axios.post(
        `${APP_BASE_URL}/password/reset/new-password`,
        data
      );
      return response.data;
    } catch (error) {
      throw Error(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.resetPassword = false;
      localStorage.removeItem("alexAuth");
    },
    googleLogin(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.user.token;
      localStorage.setItem(
        "alexAuth",
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.user.token,
        })
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        localStorage.setItem(
          "alexAuth",
          JSON.stringify({
            user: action.payload.user,
            token: action.payload.token,
          })
        );
        state.status = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.error = action.error.message;
        state.status = "error";
      })
      .addCase(resetPasswordSendEmail.pending, (state) => {
        state.error = null;
        state.status = "pending";
        state.resetPassword = false;
      })
      .addCase(resetPasswordSendEmail.fulfilled, (state) => {
        state.error = null;
        state.status = "success";
        state.resetPassword = true;
      })
      .addCase(resetPasswordSendEmail.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "error";
        state.resetPassword = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.error = null;
        state.status = "pending";
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.error = null;
        state.status = "success";
        state.resetPassword = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "error";
      })
      .addCase("auth/checkToken", (state) => {
        const storedAuthData = localStorage.getItem("alexAuth");
        if (storedAuthData) {
          const { token } = JSON.parse(storedAuthData);
          if (isTokenValid(token)) {
            state.token = token;
          } else {
            state.user = null;
            state.token = null;
            state.error = "Invalid token";
            localStorage.removeItem("alexAuth");
          }
        }
      });
  },
});

export const { logout, googleLogin } = authSlice.actions;

export const authReducer = authSlice.reducer;
