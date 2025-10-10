
// //     // // import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// //     // // import { API } from '../config/api';

// //     // // export const loginUser = createAsyncThunk(
// //     // //     'user/loginUser',
// //     // //     async (userCredentials) => {
// //     // //         const response = await fetch(API.USER_LOGIN, {
// //     // //             method: "POST",
// //     // //             headers: {
// //     // //                 "Content-Type": "application/json"
// //     // //             },
// //     // //             body: JSON.stringify(userCredentials)
// //     // //         });
            
// //     // //         if (!response.ok) {
// //     // //             throw new Error('Login failed');
// //     // //         }
            
// //     // //         const data = await response.json();
// //     // //         return data; // Make sure to return the data
// //     // //     }
// //     // // );

// //     // // const userSlice = createSlice({
// //     // //     name: 'user',
// //     // //     initialState: {
// //     // //         loading: false,
// //     // //         user: null,
// //     // //         error: null
// //     // //     },
// //     // //     reducers: {
// //     // //         // Add logout reducer
// //     // //         logout: (state) => {
// //     // //             state.loading = false;
// //     // //             state.user = null;
// //     // //             state.error = null;
// //     // //         },
// //     // //         // Optional: Clear error reducer
// //     // //         clearError: (state) => {
// //     // //             state.error = null;
// //     // //         }
// //     // //     },
// //     // //     extraReducers: (builder) => {
// //     // //         builder
// //     // //             .addCase(loginUser.pending, (state) => {
// //     // //                 state.loading = true;
// //     // //                 state.error = null;
// //     // //             })
// //     // //             .addCase(loginUser.fulfilled, (state, action) => {
// //     // //                 state.loading = false;
// //     // //                 state.user = action.payload;
// //     // //                 state.error = null;
// //     // //             })
// //     // //             .addCase(loginUser.rejected, (state, action) => {
// //     // //                 state.loading = false;
// //     // //                 state.user = null;
// //     // //                 state.error = action.error.message || "Login failed";
// //     // //             });
// //     // //     }
// //     // // });

// //     // // // Export the actions
// //     // // export const { logout, clearError } = userSlice.actions;

// //     // // export default userSlice.reducer;


// //     // import {createSlice} from "@reduxjs/toolkit"

// //     // const initialValue ={
// //     //     _id  : "",
// //     //     name : "",
// //     //     email : "",
// //     //     mobile:"",
// //     //     address:"",
// //     //     role:"",
// //     // }

// //     // const userSlice = createSlice({
// //     //     name : 'user',
// //     //     initialState : initialValue,
// //     //     reducers : {
// //     //         setUserDetails : (state , action)=>{
// //     //             state._id = action.payload?._id
// //     //            state.name = action.payload?.name
// //     //            state.email = action.payload?.email
            
// //     //             state.mobile = action.payload?.mobile
// //     //             state.address_details = action.payload?.address_details
// //     //             state.role = action.payload?.role
// //     //         },
// //     //         logout : (state, action)=>{
// //     //             state._id = ""
// //     //             state.name = ""
// //     //             state.email = ""
// //     //             state.address = ""
// //     //             state.mobile = ""
// //     //             state.role = ""

// //     //         }
// //     //     }
// //     // })

// //     // export const {setUserDetails, logout} = userSlice.actions

// //     // export default userSlice.reducer


// //     import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// // import { API } from "../config/api"; // adjust path to your API config

// // // ----------------------------
// // // Async thunk for login
// // // ----------------------------
// // export const loginUser = createAsyncThunk(
// //   "user/loginUser",
// //   async (userCredentials, { rejectWithValue }) => {
// //     try {
// //       const response = await fetch(API.USER_LOGIN, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(userCredentials),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         return rejectWithValue(errorData.message || "Invalid credentials");
// //       }

// //       const data = await response.json();

// //       if (data.token) {
// //         localStorage.setItem("token", data.token);
// //       }

// //       return data.user; // return only user object
// //     } catch (err) {
// //       return rejectWithValue(err.message || "Something went wrong");
// //     }
// //   }
// // );

// // // ----------------------------
// // // Safe parse localStorage for initial state
// // // ----------------------------
// // let userFromStorage = null;
// // try {
// //   const storedUser = localStorage.getItem("user");
// //   if (storedUser && storedUser !== "undefined") {
// //     userFromStorage = JSON.parse(storedUser);
// //   }
// // } catch (err) {
// //   console.warn("Failed to parse user from localStorage:", err);
// //   userFromStorage = null;
// // }

// // // ----------------------------
// // // Slice
// // // ----------------------------
// // const initialState = {
// //   loading: false,
// //   user: userFromStorage,
// //   error: null,
// // };

// // const userSlice = createSlice({
// //   name: "user",
// //   initialState,
// //   reducers: {
// //     setUserDetails: (state, action) => {
// //       state.user = action.payload;
// //       localStorage.setItem("user", JSON.stringify(action.payload));
// //     },
// //     logout: (state) => {
// //       state.loading = false;
// //       state.user = null;
// //       state.error = null;
// //       localStorage.removeItem("token");
// //       localStorage.removeItem("user");
// //     },
// //     clearError: (state) => {
// //       state.error = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(loginUser.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(loginUser.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.user = action.payload;
// //         localStorage.setItem("user", JSON.stringify(action.payload));
// //       })
// //       .addCase(loginUser.rejected, (state, action) => {
// //         state.loading = false;
// //         state.user = null;
// //         state.error = action.payload || "Login failed";
// //       });
// //   },
// // });

// // // ----------------------------
// // // Exports
// // // ----------------------------
// // export const { setUserDetails, logout, clearError } = userSlice.actions;
// // export default userSlice.reducer;


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { API } from "../config/api";

// // Async thunk for login
// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async (userCredentials, { rejectWithValue }) => {
//     try {
//       const response = await fetch(API.USER_LOGIN, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userCredentials),
//         credentials: 'include' // Important for cookies
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         return rejectWithValue(data.message || "Invalid credentials");
//       }

//       return data; // Return complete response with user data and accessToken
//     } catch (err) {
//       return rejectWithValue(err.message || "Something went wrong");
//     }
//   }
// );

// // Async thunk for user profile
// export const fetchUserProfile = createAsyncThunk(
//   "user/fetchUserProfile",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch(API.USER_PROFILE, {
//         method: "GET",
//         credentials: 'include' // Important for cookies
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         return rejectWithValue(data.message || "Failed to fetch profile");
//       }

//       return data.data; // Return user data
//     } catch (err) {
//       return rejectWithValue(err.message || "Failed to fetch profile");
//     }
//   }
// );

// // Async thunk for logout
// export const logoutUser = createAsyncThunk(
//   "user/logoutUser",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch(API.USER_LOGOUT, {
//         method: "POST",
//         credentials: 'include'
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         return rejectWithValue(data.message || "Logout failed");
//       }

//       return data;
//     } catch (err) {
//       return rejectWithValue(err.message || "Logout failed");
//     }
//   }
// );

// // Get initial state from localStorage
// const getInitialState = () => {
//   let user = null;

//   try {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser && storedUser !== "undefined") {
//       user = JSON.parse(storedUser);
//     }
//   } catch (err) {
//     console.warn("Failed to parse stored user data:", err);
//   }

//   return {
//     loading: false,
//     user,
//     error: null,
//   };
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState: getInitialState(),
//   reducers: {
//     setUserDetails: (state, action) => {
//       state.user = action.payload;
//       localStorage.setItem("user", JSON.stringify(action.payload));
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Login cases
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.data.user;
//         state.error = null;
//         localStorage.setItem("user", JSON.stringify(action.payload.data.user));
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.user = null;
//         state.error = action.payload || "Login failed";
//       })
//       // Profile fetch cases
//       .addCase(fetchUserProfile.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchUserProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.error = null;
//         localStorage.setItem("user", JSON.stringify(action.payload));
//       })
//       .addCase(fetchUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to fetch profile";
//       })
//       // Logout cases
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.loading = false;
//         state.user = null;
//         state.error = null;
//         localStorage.removeItem("user");
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.loading = false;
//         state.user = null;
//         state.error = null;
//         localStorage.removeItem("user");
//       });
//   },
// });

// export const { setUserDetails, clearError } = userSlice.actions;
// export default userSlice.reducer;
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