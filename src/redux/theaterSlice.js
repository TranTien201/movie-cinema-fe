import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  theaters: [],
  theater: null,
  loading: false,
  error: null,
};

// Async thunk for fetching all theaters
export const fetchAllTheaters = createAsyncThunk(
  "theater/fetchAllTheaters",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/theaters");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching theater by ID
export const fetchTheaterById = createAsyncThunk(
  "theater/fetchTheaterById",
  async (theaterId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/theaters/${theaterId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating theater
export const createTheater = createAsyncThunk(
  "theater/createTheater",
  async (theater, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/theaters/save", theater);
      toast.success("Theater created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create theater");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating theater
export const updateTheater = createAsyncThunk(
  "theater/updateTheater",
  async (theater, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/v1/theaters/${theater.theaterId}`,
        theater
      );
      toast.success("Theater updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update theater");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting theater
export const deleteTheater = createAsyncThunk(
  "theater/deleteTheater",
  async (theaterId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v1/theaters/${theaterId}`);
      toast.success("Theater deleted successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete theater");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for finding theaters by name
export const findTheaterByName = createAsyncThunk(
  "theater/findTheaterByName",
  async (theaterName, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/theaters/search?theaterName=${theaterName}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Theater slice
const theaterSlice = createSlice({
  name: "theater",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTheaters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTheaters.fulfilled, (state, action) => {
        state.loading = false;
        state.theaters = action.payload;
      })
      .addCase(fetchAllTheaters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTheaterById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTheaterById.fulfilled, (state, action) => {
        state.loading = false;
        state.theater = action.payload;
      })
      .addCase(fetchTheaterById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTheater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTheater.fulfilled, (state, action) => {
        state.loading = false;
        state.theaters.push(action.payload);
      })
      .addCase(createTheater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTheater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTheater.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.theaters.findIndex(
          (theater) => theater.theaterId === action.payload.theaterId
        );
        if (index !== -1) {
          state.theaters[index] = action.payload;
        }
      })
      .addCase(updateTheater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTheater.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTheater.fulfilled, (state, action) => {
        state.loading = false;
        state.theaters = state.theaters.filter(
          (theater) => theater.theaterId !== action.meta.arg
        );
      })
      .addCase(deleteTheater.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(findTheaterByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findTheaterByName.fulfilled, (state, action) => {
        state.loading = false;
        state.theaters = action.payload;
      })
      .addCase(findTheaterByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default theaterSlice.reducer;
