import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "utils/axios";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  timeKeepings: [],
  timeKeeping: null,
  loading: false,
  error: null,
};

// Async thunk for fetching all time keepings
export const fetchAllTimeKeepings = createAsyncThunk(
  "timeKeeping/fetchAllTimeKeepings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/api/v1/time-keeping");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching time keeping by ID
export const fetchTimeKeepingById = createAsyncThunk(
  "timeKeeping/fetchTimeKeepingById",
  async (timeKeepingId, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/api/v1/time-keeping/${timeKeepingId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating time keeping
export const createTimeKeeping = createAsyncThunk(
  "timeKeeping/createTimeKeeping",
  async (timeKeeping, { rejectWithValue }) => {
    try {
      const response = await instance.post("/api/v1/time-keeping", timeKeeping);
      toast.success("Time keeping created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create time keeping");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating time keeping
export const updateTimeKeeping = createAsyncThunk(
  "timeKeeping/updateTimeKeeping",
  async (account, { rejectWithValue }) => {
    try {
      const response = await instance.put(
        "/api/v1/time-keeping/update",
        account
      );
      toast.success("Time keeping updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update time keeping");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting time keeping
export const deleteTimeKeeping = createAsyncThunk(
  "timeKeeping/deleteTimeKeeping",
  async (timeKeepingId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/v1/time-keeping/delete/${timeKeepingId}`
      );
      toast.success("Time keeping deleted successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete time keeping");
      return rejectWithValue(error.response.data);
    }
  }
);

// Time keeping slice
const timeKeepingSlice = createSlice({
  name: "timeKeeping",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTimeKeepings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTimeKeepings.fulfilled, (state, action) => {
        state.loading = false;
        state.timeKeepings = action.payload;
      })
      .addCase(fetchAllTimeKeepings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTimeKeepingById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimeKeepingById.fulfilled, (state, action) => {
        state.loading = false;
        state.timeKeeping = action.payload;
      })
      .addCase(fetchTimeKeepingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTimeKeeping.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTimeKeeping.fulfilled, (state, action) => {
        state.loading = false;
        state.timeKeepings.push(action.payload);
      })
      .addCase(createTimeKeeping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTimeKeeping.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTimeKeeping.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.timeKeepings.findIndex(
          (timeKeeping) =>
            timeKeeping.timekeepingId === action.payload.timekeepingId
        );
        if (index !== -1) {
          state.timeKeepings[index].endTime = action.payload.endTime;
        } else {
          state.timeKeepings.push(action.payload);
        }
        toast.success("Chấm công thành công");
      })
      .addCase(updateTimeKeeping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTimeKeeping.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTimeKeeping.fulfilled, (state, action) => {
        state.loading = false;
        state.timeKeepings = state.timeKeepings.filter(
          (timeKeeping) => timeKeeping.timekeepingId !== action.meta.arg
        );
      })
      .addCase(deleteTimeKeeping.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default timeKeepingSlice.reducer;
