import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  ticketOrderDetails: [],
  ticketOrderDetail: null,
  loading: false,
  error: null,
};

// Async thunk for fetching all ticket order details
export const fetchAllTicketOrderDetails = createAsyncThunk(
  "ticketOrderDetail/fetchAllTicketOrderDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/ticket-order-detail");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating ticket order detail
export const createTicketOrderDetail = createAsyncThunk(
  "ticketOrderDetail/createTicketOrderDetail",
  async (ticketOrderDetail, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/v1/ticket-order-detail",
        ticketOrderDetail
      );
      toast.success("Ticket order detail created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create ticket order detail");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating ticket order detail
export const updateTicketOrderDetail = createAsyncThunk(
  "ticketOrderDetail/updateTicketOrderDetail",
  async (ticketOrderDetail, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "/api/v1/ticket-order-detail/update",
        ticketOrderDetail
      );
      toast.success("Ticket order detail updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update ticket order detail");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting ticket order detail
export const deleteTicketOrderDetail = createAsyncThunk(
  "ticketOrderDetail/deleteTicketOrderDetail",
  async (ticketOrderDetailId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/v1/ticket-order-detail/delete/${ticketOrderDetailId}`
      );
      toast.success("Ticket order detail deleted successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete ticket order detail");
      return rejectWithValue(error.response.data);
    }
  }
);

// Ticket order detail slice
const ticketOrderDetailSlice = createSlice({
  name: "ticketOrderDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTicketOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTicketOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketOrderDetails = action.payload;
      })
      .addCase(fetchAllTicketOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTicketOrderDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTicketOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketOrderDetails.push(action.payload);
      })
      .addCase(createTicketOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTicketOrderDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTicketOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.ticketOrderDetails.findIndex(
          (detail) => detail.id === action.payload.id
        );
        if (index !== -1) {
          state.ticketOrderDetails[index] = action.payload;
        }
      })
      .addCase(updateTicketOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTicketOrderDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTicketOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketOrderDetails = state.ticketOrderDetails.filter(
          (detail) => detail.id !== action.meta.arg
        );
      })
      .addCase(deleteTicketOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ticketOrderDetailSlice.reducer;
