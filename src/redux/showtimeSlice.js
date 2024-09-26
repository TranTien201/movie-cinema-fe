import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "utils/axios";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  showtimes: [],
  dateShowtimes: [],
  dates: [],
  theaters: [],
  showtime: null,
  loading: false,
  error: null,
};

export const fetchAllShowtimesByDate = createAsyncThunk(
  "showtime/fetchAllShowtimesByDate",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/api/v1/showtime/by-dates");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching all showtimes
export const fetchAllShowtimes = createAsyncThunk(
  "showtime/fetchAllShowtimes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/api/v1/showtime");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching showtime by ID
export const fetchShowtimeById = createAsyncThunk(
  "showtime/fetchShowtimeById",
  async (showtimeId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/api/v1/showtime/${showtimeId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating showtime
export const createShowtime = createAsyncThunk(
  "showtime/createShowtime",
  async (showtime, { rejectWithValue }) => {
    try {
      const response = await instance.post("/api/v1/showtime", showtime);
      toast.success("Showtime created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create showtime");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating showtime
export const updateShowtime = createAsyncThunk(
  "showtime/updateShowtime",
  async (showtime, { rejectWithValue }) => {
    try {
      const response = await instance.put("/api/v1/showtime", showtime);
      toast.success("Showtime updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update showtime");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting showtime
export const deleteShowtime = createAsyncThunk(
  "showtime/deleteShowtime",
  async (showtimeId, { rejectWithValue }) => {
    try {
      const response = await instance.delete(`/api/v1/showtime/${showtimeId}`);
      toast.success("Showtime deleted successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete showtime");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching showtimes by movie ID
export const fetchShowtimesByMovieId = createAsyncThunk(
  "showtime/fetchShowtimesByMovieId",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/api/v1/showtime/movie/${movieId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Showtime slice
const showtimeSlice = createSlice({
  name: "showtime",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllShowtimesByDate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllShowtimesByDate.fulfilled, (state, action) => {
        const today = new Date();

        // Lọc ra các ngày sau ngày hiện tại
        state.dates = Object.keys(action.payload).filter((dateStr) => {
          const showtimeDate = new Date(dateStr);
          return showtimeDate >= today;
        });

        // Duyệt qua các showtime và lưu theater nếu chưa tồn tại
        Object.values(action.payload).forEach((showtimesOnDate) => {
          showtimesOnDate.forEach((showtime) => {
            const theater = showtime.theater;
            // Kiểm tra nếu theaterId chưa tồn tại trong state.theaters
            const theaterExists = state.theaters.some(
              (t) => t.theaterId === theater.theaterId
            );

            if (!theaterExists) {
              state.theaters.push(theater);
            }
          });
        });
        state.dateShowtimes = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllShowtimesByDate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllShowtimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllShowtimes.fulfilled, (state, action) => {
        state.loading = false;
        state.showtimes = action.payload;
      })
      .addCase(fetchAllShowtimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchShowtimeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowtimeById.fulfilled, (state, action) => {
        state.loading = false;
        state.showtime = action.payload;
      })
      .addCase(fetchShowtimeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createShowtime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShowtime.fulfilled, (state, action) => {
        state.loading = false;
        state.showtimes.push(action.payload);
      })
      .addCase(createShowtime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateShowtime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShowtime.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.showtimes.findIndex(
          (showtime) => showtime.showtimeId === action.payload.showtimeId
        );
        if (index !== -1) {
          state.showtimes[index] = action.payload;
        }
      })
      .addCase(updateShowtime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteShowtime.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteShowtime.fulfilled, (state, action) => {
        state.loading = false;
        state.showtimes = state.showtimes.filter(
          (showtime) => showtime.showtimeId !== action.meta.arg
        );
      })
      .addCase(deleteShowtime.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchShowtimesByMovieId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShowtimesByMovieId.fulfilled, (state, action) => {
        state.loading = false;
        state.showtimes = action.payload;
      })
      .addCase(fetchShowtimesByMovieId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default showtimeSlice.reducer;
