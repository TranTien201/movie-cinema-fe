import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import instance from "utils/axios";

// Initial state
const initialState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
};

// Async thunk for fetching all categories
export const fetchAllCategories = createAsyncThunk(
  "category/fetchAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/api/v1/categories");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await instance.post("/api/v1/categories", categoryData);
      toast.success("Thêm thể loại phim thành công");
      return response.data;
    } catch (error) {
      toast.error("Thêm thể loại phim thất bại");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching category by ID
export const fetchCategoryById = createAsyncThunk(
  "category/fetchCategoryById",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.put("/api/v1/categories/update", category);
      toast.success("Category updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update category");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/v1/categories/delete/${categoryId}`
      );
      toast.success("Category deleted successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete category");
      return rejectWithValue(error.response.data);
    }
  }
);

// Category slice
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || {
          message: "Thêm thể loại phim thất bại",
        };
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (category) => category.categoryId !== action.meta.arg
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
