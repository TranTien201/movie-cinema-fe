import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  productOrderDetails: [],
  productOrderDetail: null,
  loading: false,
  error: null,
};

// Async thunk for fetching all product order details
export const fetchAllProductOrderDetails = createAsyncThunk(
  "productOrderDetail/fetchAllProductOrderDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/product-order-detail");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating product order detail
export const createProductOrderDetail = createAsyncThunk(
  "productOrderDetail/createProductOrderDetail",
  async (productOrderDetail, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/product-order-detail",
        productOrderDetail
      );
      toast.success("Product order detail created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create product order detail");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating product order detail
export const updateProductOrderDetail = createAsyncThunk(
  "productOrderDetail/updateProductOrderDetail",
  async (productOrderDetail, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "/api/product-order-detail/update",
        productOrderDetail
      );
      toast.success("Product order detail updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update product order detail");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting product order detail
export const deleteProductOrderDetail = createAsyncThunk(
  "productOrderDetail/deleteProductOrderDetail",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/product-order-detail/delete/${orderId}`
      );
      toast.success("Product order detail deleted successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete product order detail");
      return rejectWithValue(error.response.data);
    }
  }
);

// Product order detail slice
const productOrderDetailSlice = createSlice({
  name: "productOrderDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProductOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productOrderDetails = action.payload;
      })
      .addCase(fetchAllProductOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProductOrderDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.productOrderDetails.push(action.payload);
      })
      .addCase(createProductOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProductOrderDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.productOrderDetails.findIndex(
          (detail) => detail.productDetailId === action.payload.productDetailId
        );
        if (index !== -1) {
          state.productOrderDetails[index] = action.payload;
        }
      })
      .addCase(updateProductOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProductOrderDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductOrderDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.productOrderDetails = state.productOrderDetails.filter(
          (detail) => detail.productDetailId !== action.meta.arg
        );
      })
      .addCase(deleteProductOrderDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productOrderDetailSlice.reducer;
