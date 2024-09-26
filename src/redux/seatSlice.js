import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  seats: [],
  seat: null,
  loading: false,
  error: null,
};

// Async thunk for fetching all seats
export const fetchAllSeats = createAsyncThunk(
  "seat/fetchAllSeats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/seats");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching seat by ID
export const fetchSeatById = createAsyncThunk(
  "seat/fetchSeatById",
  async (seatId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/seats/${seatId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating seat
export const createSeat = createAsyncThunk(
  "seat/createSeat",
  async (seat, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/seats", seat);
      toast.success("Seat created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create seat");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating seat
export const updateSeat = createAsyncThunk(
  "seat/updateSeat",
  async (seat, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/v1/seats", seat);
      toast.success("Seat updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update seat");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting seat
export const deleteSeat = createAsyncThunk(
  "seat/deleteSeat",
  async (seatId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v1/seats/${seatId}`);
      toast.success("Seat deleted successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete seat");
      return rejectWithValue(error.response.data);
    }
  }
);

// Seat slice
const seatSlice = createSlice({
  name: "seat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSeats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSeats.fulfilled, (state, action) => {
        state.loading = false;
        state.seats = action.payload;
      })
      .addCase(fetchAllSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchSeatById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeatById.fulfilled, (state, action) => {
        state.loading = false;
        state.seat = action.payload;
      })
      .addCase(fetchSeatById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createSeat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSeat.fulfilled, (state, action) => {
        state.loading = false;
        state.seats.push(action.payload);
      })
      .addCase(createSeat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateSeat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSeat.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.seats.findIndex(
          (seat) => seat.seatId === action.payload.seatId
        );
        if (index !== -1) {
          state.seats[index] = action.payload;
        }
      })
      .addCase(updateSeat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteSeat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSeat.fulfilled, (state, action) => {
        state.loading = false;
        state.seats = state.seats.filter(
          (seat) => seat.seatId !== action.meta.arg
        );
      })
      .addCase(deleteSeat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default seatSlice.reducer;
