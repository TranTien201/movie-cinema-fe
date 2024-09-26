import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "utils/axios";
import { toast } from "react-toastify";
import axios from "axios";

const getInitialState = () => {
  const token = localStorage.getItem("token");
  const account = localStorage.getItem("account");
  return {
    account: account ? JSON.parse(account) : null,
    token: token || null,
    isLoading: false,
    isSuccess: false,
    error: null,
  };
};

// Initial state
// const initialState = getInitialState();

// Initial state
const initialState = {
  accounts: [],
  account: null,
  payRoll: null,
  token: null,
  isLoading: false,
  isSuccess: false,
  error: null,
};

// Async thunk for registering an account
export const signUpAccount = createAsyncThunk(
  "account/register",
  async (accountData, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        "http://localhost:8080/api/v1/accounts/register",
        accountData
      );
      toast.success("Account registered successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to register account");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for login (verify account with JWT)
export const loginAccount = createAsyncThunk(
  "account/login",
  async (accountData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/accounts/login",
        accountData
      );
      toast.success("Login successful");
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      toast.error("Login failed");
      console.log("error");

      return rejectWithValue(error.response.data);
    }
  }
);

export const getPayRollForEmployee = createAsyncThunk(
  "account/getPayRollForEmployee",
  async (accountId, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/api/v1/accounts/employee/${accountId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk for updating account
// export const updateAccount = createAsyncThunk(
//   "account/update",
//   async (accountData, { rejectWithValue }) => {
//     try {
//       const response = await axios.put("/api/v1/account/update", accountData);
//       toast.success("Account updated successfully");
//       return response.data;
//     } catch (error) {
//       toast.error("Failed to update account");
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Async thunk for deleting account
// export const deleteAccount = createAsyncThunk(
//   "account/delete",
//   async (accountId, { rejectWithValue }) => {
//     try {
//       const response = await axios.delete(
//         `/api/v1/account/delete/${accountId}`
//       );
//       toast.success("Account deleted successfully");
//       return response.data;
//     } catch (error) {
//       toast.error("Failed to delete account");
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// Account slice
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    logout(state) {
      state.account = null;
      state.token = null;
      localStorage.removeItem("token");
      toast.info("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpAccount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.account = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signUpAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginAccount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.isLoading = false;
        state.account = action.payload;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
        // localStorage.setItem("account", JSON.stringify(action.payload));
      })
      .addCase(loginAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Sai tài khoản hoặc mật khẩu";
      })
      .addCase(getPayRollForEmployee.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPayRollForEmployee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.payRoll = action.payload;
      })
      .addCase(getPayRollForEmployee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
    // .addCase(updateAccount.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(updateAccount.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.account = action.payload;
    // })
    // .addCase(updateAccount.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // })
    // .addCase(deleteAccount.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(deleteAccount.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.account = null;
    //   state.token = null;
    // })
    // .addCase(deleteAccount.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

export const { logout } = accountSlice.actions;
export default accountSlice.reducer;
