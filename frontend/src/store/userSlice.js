
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../config/api";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await fetch(API.USER_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCredentials),
        credentials: 'include' // Important for cookies
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Invalid credentials");
      }

      return data; // Return complete response with user data and accessToken
    } catch (err) {
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

// Async thunk for user profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API.USER_PROFILE, {
        method: "GET",
        credentials: 'include' // Important for cookies
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch profile");
      }

      return data.data; // Return user data
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch profile");
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(API.USER_LOGOUT, {
        method: "POST",
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Logout failed");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Logout failed");
    }
  }
);

// Get initial state from localStorage
const getInitialState = () => {
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (err) {
    console.warn("Failed to parse stored user data:", err);
  }

  return {
    loading: false,
    user,
    error: null,
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    clearError: (state) => {
      state.error = null;
    },
    // ADD THIS LOGOUT REDUCER
    logout: (state) => {
      state.loading = false;
      state.user = null;
      state.error = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload || "Login failed";
      })
      // Profile fetch cases
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch profile";
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        localStorage.removeItem("user");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        localStorage.removeItem("user");
      });
  },
});

// UPDATE THIS EXPORT TO INCLUDE LOGOUT
export const { setUserDetails, clearError, logout } = userSlice.actions;
export default userSlice.reducer;