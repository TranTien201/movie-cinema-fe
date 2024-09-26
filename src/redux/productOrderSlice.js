import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  productOrders: [],
  productOrder: null,
  loading: false,
  error: null,
};

// Async thunk for fetching all product orders
export const fetchAllProductOrders = createAsyncThunk(
  "productOrder/fetchAllProductOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/product-order");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching product orders by account ID
export const fetchProductOrdersByAccountId = createAsyncThunk(
  "productOrder/fetchProductOrdersByAccountId",
  async (accountId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/product-order/account/${accountId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching product order by ID
export const fetchProductOrderById = createAsyncThunk(
  "productOrder/fetchProductOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/product-order/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating product order
export const createProductOrder = createAsyncThunk(
  "productOrder/createProductOrder",
  async (productOrder, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/product-order", productOrder);
      toast.success("Product order created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create product order");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating product order
export const updateProductOrder = createAsyncThunk(
  "productOrder/updateProductOrder",
  async (productOrder, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/v1/product-order/${productOrder.orderProductId}`,
        productOrder
      );
      toast.success("Product order updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update product order");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting product order
export const deleteProductOrder = createAsyncThunk(
  "productOrder/deleteProductOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v1/product-order/${orderId}`);
      toast.success("Product order deleted successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete product order");
      return rejectWithValue(error.response.data);
    }
  }
);

// Product order slice
const productOrderSlice = createSlice({
  name: "productOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.productOrders = action.payload;
      })
      .addCase(fetchAllProductOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductOrdersByAccountId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductOrdersByAccountId.fulfilled, (state, action) => {
        state.loading = false;
        state.productOrders = action.payload;
      })
      .addCase(fetchProductOrdersByAccountId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.productOrder = action.payload;
      })
      .addCase(fetchProductOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProductOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.productOrders.push(action.payload);
      })
      .addCase(createProductOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProductOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductOrder.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.productOrders.findIndex(
          (order) => order.orderProductId === action.payload.orderProductId
        );
        if (index !== -1) {
          state.productOrders[index] = action.payload;
        }
      })
      .addCase(updateProductOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProductOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.productOrders = state.productOrders.filter(
          (order) => order.orderProductId !== action.meta.arg
        );
      })
      .addCase(deleteProductOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productOrderSlice.reducer;
