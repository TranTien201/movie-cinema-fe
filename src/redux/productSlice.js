import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// Initial state
const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

// Async thunk for fetching all products
export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/products/public/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching product by ID
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/products/public/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating product
export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/products/add", product);
      toast.success("Product created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create product");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/v1/products/${product.productId}`,
        product
      );
      toast.success("Product updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update product");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v1/products/${productId}`);
      toast.success("Product deleted successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete product");
      return rejectWithValue(error.response.data);
    }
  }
);

// Product slice
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product.productId === action.payload.productId
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product.productId !== action.meta.arg
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
