import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  movieOrders: [],
  movieOrder: null,
  loading: false,
  error: null,
};

// Async thunk for fetching all movie orders
export const fetchAllMovieOrders = createAsyncThunk(
  "movieOrder/fetchAllMovieOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/movie-order");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching movie order by ID
export const fetchMovieOrderById = createAsyncThunk(
  "movieOrder/fetchMovieOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/movie-order/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating movie order
export const createMovieOrder = createAsyncThunk(
  "movieOrder/createMovieOrder",
  async (movieOrder, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/movie-order", movieOrder);
      toast.success("Movie order created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create movie order");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating movie order
export const updateMovieOrder = createAsyncThunk(
  "movieOrder/updateMovieOrder",
  async (movieOrder, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/v1/movie-order", movieOrder);
      toast.success("Movie order updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update movie order");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting movie order
export const deleteMovieOrder = createAsyncThunk(
  "movieOrder/deleteMovieOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v1/movie-order/${orderId}`);
      toast.success("Movie order deleted successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete movie order");
      return rejectWithValue(error.response.data);
    }
  }
);

// Movie order slice
const movieOrderSlice = createSlice({
  name: "movieOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovieOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMovieOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.movieOrders = action.payload;
      })
      .addCase(fetchAllMovieOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMovieOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.movieOrder = action.payload;
      })
      .addCase(fetchMovieOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createMovieOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMovieOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.movieOrders.push(action.payload);
      })
      .addCase(createMovieOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMovieOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMovieOrder.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.movieOrders.findIndex(
          (order) => order.movieOrderId === action.payload.movieOrderId
        );
        if (index !== -1) {
          state.movieOrders[index] = action.payload;
        }
      })
      .addCase(updateMovieOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMovieOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovieOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.movieOrders = state.movieOrders.filter(
          (order) => order.movieOrderId !== action.meta.arg
        );
      })
      .addCase(deleteMovieOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default movieOrderSlice.reducer;
