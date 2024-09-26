import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "utils/axios";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  theaterSeats: [],
  theaterSeat: null,
  loading: false,
  error: null,
};

// Async thunk for fetching all theater seats
export const fetchAllTheaterSeats = createAsyncThunk(
  "theaterSeat/fetchAllTheaterSeats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/api/v1/theater-seat");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllTheaterAndCountSeat = createAsyncThunk(
  "theaterSeat/fetchAllTheaterAndCountSeat",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/api/v1/theater-seat/seat-count");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching theater seat by ID
export const fetchTheaterSeatById = createAsyncThunk(
  "theaterSeat/fetchTheaterSeatById",
  async (theaterSeatId, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/api/v1/theater-seat/${theaterSeatId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating theater seat
export const createTheaterSeat = createAsyncThunk(
  "theaterSeat/createTheaterSeat",
  async (theaterSeat, { rejectWithValue }) => {
    try {
      const response = await instance.post("/api/v1/theater-seat", theaterSeat);
      toast.success("Theater seat created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create theater seat");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating theater seat by file upload
export const createTheaterSeatByFileUpload = createAsyncThunk(
  "theaterSeat/createTheaterSeatByFileUpload",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await instance.post(
        "/api/v1/theater-seat/save/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Theater seats created successfully by file upload");
      return response.data;
    } catch (error) {
      toast.error("Failed to create theater seats by file upload");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating theater seat
export const updateTheaterSeat = createAsyncThunk(
  "theaterSeat/updateTheaterSeat",
  async (theaterSeat, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "/api/v1/theater-seat/update",
        theaterSeat
      );
      toast.success("Theater seat updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update theater seat");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting theater seat
export const deleteTheaterSeat = createAsyncThunk(
  "theaterSeat/deleteTheaterSeat",
  async (theaterSeatId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/v1/theater-seat/delete/${theaterSeatId}`
      );
      toast.success("Theater seat deleted successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete theater seat");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for finding seats by theater ID
export const findSeatsByTheaterId = createAsyncThunk(
  "theaterSeat/findSeatsByTheaterId",
  async (theaterId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/theater-seat/theater-seat/${theaterId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for finding seats by type
export const findSeatsByType = createAsyncThunk(
  "theaterSeat/findSeatsByType",
  async ({ theaterId, type }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/theater-seat/type?theaterId=${theaterId}&type=${type}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for finding seats by status
export const findSeatsByStatus = createAsyncThunk(
  "theaterSeat/findSeatsByStatus",
  async ({ theaterId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/theater-seat/status?theaterId=${theaterId}&status=${status}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Theater seat slice
const theaterSeatSlice = createSlice({
  name: "theaterSeat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTheaterAndCountSeat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTheaterAndCountSeat.fulfilled, (state, action) => {
        state.loading = false;
        state.theaterSeats = action.payload;
      })
      .addCase(fetchAllTheaterAndCountSeat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllTheaterSeats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTheaterSeats.fulfilled, (state, action) => {
        state.loading = false;
        state.theaterSeats = action.payload;
      })
      .addCase(fetchAllTheaterSeats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTheaterSeatById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTheaterSeatById.fulfilled, (state, action) => {
        state.loading = false;
        state.theaterSeat = action.payload;
      })
      .addCase(fetchTheaterSeatById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTheaterSeat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTheaterSeat.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createTheaterSeat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTheaterSeatByFileUpload.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTheaterSeatByFileUpload.fulfilled, (state, action) => {
        state.loading = false;
        action.payload.forEach((newSeat) => {
          console.log("New seat: ", newSeat);

          const theaterId = newSeat.theater.theaterId;

          // Find the corresponding theater in the state by theaterId
          let theater = state.theaterSeats.find(
            (t) => t.theaterId === theaterId
          );

          // If theater is not found, create a new theater object with default values
          if (!theater) {
            theater = {
              id: 0,
              seatId: null,
              theaterId: theaterId,
              theaterName: newSeat.theater.theaterName || `Rạp ${theaterId}`, // Default theater name if not provided
              seatType: null,
              seatStatus: null,
              price: 0,
              seatCounts: {
                VIP: 0, // Initialize VIP seat count to 0
                NORMAL: 0, // Initialize NORMAL seat count to 0
              },
            };

            state.theaterSeats.push(theater);
          }

          const seatType = newSeat.seatType;
          if (seatType === "VIP") {
            theater.seatCounts.VIP += 1;
          } else if (seatType === "NORMAL") {
            theater.seatCounts.NORMAL += 1;
          }
        });
      })
      .addCase(createTheaterSeatByFileUpload.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTheaterSeat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTheaterSeat.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.theaterSeats.findIndex(
          (seat) => seat.id === action.payload.id
        );
        if (index !== -1) {
          state.theaterSeats[index] = action.payload;
        }
      })
      .addCase(updateTheaterSeat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTheaterSeat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTheaterSeat.fulfilled, (state, action) => {
        state.loading = false;
        state.theaterSeats = state.theaterSeats.filter(
          (seat) => seat.id !== action.meta.arg
        );
      })
      .addCase(deleteTheaterSeat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(findSeatsByTheaterId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findSeatsByTheaterId.fulfilled, (state, action) => {
        state.loading = false;
        state.theaterSeats = action.payload;
      })
      .addCase(findSeatsByTheaterId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(findSeatsByType.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findSeatsByType.fulfilled, (state, action) => {
        state.loading = false;
        state.theaterSeats = action.payload;
      })
      .addCase(findSeatsByType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(findSeatsByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(findSeatsByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.theaterSeats = action.payload;
      })
      .addCase(findSeatsByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default theaterSeatSlice.reducer;
