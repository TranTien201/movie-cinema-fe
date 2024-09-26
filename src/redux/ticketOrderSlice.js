import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  ticketOrders: [],
  ticketOrder: null,
  revenue: 0,
  loading: false,
  error: null,
};

// Async thunk for fetching all ticket orders
export const fetchAllTicketOrders = createAsyncThunk(
  "ticketOrder/fetchAllTicketOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/ticket-order");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching ticket orders by account ID
export const fetchTicketOrdersByAccountId = createAsyncThunk(
  "ticketOrder/fetchTicketOrdersByAccountId",
  async (accountId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/ticket-order/account/${accountId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching ticket order by ID
export const fetchTicketOrderById = createAsyncThunk(
  "ticketOrder/fetchTicketOrderById",
  async (ticketOrderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/ticket-order/${ticketOrderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating ticket order
export const createTicketOrder = createAsyncThunk(
  "ticketOrder/createTicketOrder",
  async (ticketOrder, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/ticket-order", ticketOrder);
      toast.success("Ticket order created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create ticket order");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating ticket order
export const updateTicketOrder = createAsyncThunk(
  "ticketOrder/updateTicketOrder",
  async (ticketOrder, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/v1/ticket-order/update/${ticketOrder.orderId}`,
        ticketOrder
      );
      toast.success("Ticket order updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update ticket order");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting ticket order
export const deleteTicketOrder = createAsyncThunk(
  "ticketOrder/deleteTicketOrder",
  async (ticketOrderId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/v1/ticket-order/delete/${ticketOrderId}`
      );
      toast.success("Ticket order deleted successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete ticket order");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching revenue by date range
export const fetchRevenueByDateRange = createAsyncThunk(
  "ticketOrder/fetchRevenueByDateRange",
  async ({ start, end }, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/ticket-order/revenue/by-date", {
        params: { start, end },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching revenue by choose
export const fetchRevenueByChoose = createAsyncThunk(
  "ticketOrder/fetchRevenueByChoose",
  async ({ choose, time }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "/api/v1/ticket-order/revenue/by-choose",
        {
          params: { choose, time },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ticketOrderSlice = createSlice({
  name: "ticketOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTicketOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTicketOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketOrders = action.payload;
      })
      .addCase(fetchAllTicketOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTicketOrdersByAccountId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicketOrdersByAccountId.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketOrders = action.payload;
      })
      .addCase(fetchTicketOrdersByAccountId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTicketOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTicketOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketOrder = action.payload;
      })
      .addCase(fetchTicketOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTicketOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTicketOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketOrders.push(action.payload);
      })
      .addCase(createTicketOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTicketOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTicketOrder.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.ticketOrders.findIndex(
          (order) => order.orderId === action.payload.orderId
        );
        if (index !== -1) {
          state.ticketOrders[index] = action.payload;
        }
      })
      .addCase(updateTicketOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTicketOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTicketOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.ticketOrders = state.ticketOrders.filter(
          (order) => order.orderId !== action.meta.arg
        );
      })
      .addCase(deleteTicketOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRevenueByDateRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRevenueByDateRange.fulfilled, (state, action) => {
        state.loading = false;
        state.revenue = action.payload;
      })
      .addCase(fetchRevenueByDateRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchRevenueByChoose.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRevenueByChoose.fulfilled, (state, action) => {
        state.loading = false;
        state.revenue = action.payload;
      })
      .addCase(fetchRevenueByChoose.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ticketOrderSlice.reducer;
