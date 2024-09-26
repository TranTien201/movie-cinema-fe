import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "utils/axios";

import { toast } from "react-toastify";

// Initial state
const initialState = {
  labels: [],
  label: null,
  loading: false,
  error: null,
};

// Async thunk for fetching all labels
export const fetchAllLabels = createAsyncThunk(
  "label/fetchAllLabels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/api/v1/labels");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching label by ID
export const fetchLabelById = createAsyncThunk(
  "label/fetchLabelById",
  async (labelId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/labels/${labelId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating label
export const createLabel = createAsyncThunk(
  "label/createLabel",
  async (label, { rejectWithValue }) => {
    try {
      const response = await instance.post("/api/v1/labels", label);
      toast.success("Label created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create label");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating label
export const updateLabel = createAsyncThunk(
  "label/updateLabel",
  async (label, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/v1/labels/${label.labelId}`,
        label
      );
      toast.success("Label updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update label");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting label
export const deleteLabel = createAsyncThunk(
  "label/deleteLabel",
  async (labelId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v1/labels/${labelId}`);
      toast.success("Label deleted successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete label");
      return rejectWithValue(error.response.data);
    }
  }
);

// Label slice
const labelSlice = createSlice({
  name: "label",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLabels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllLabels.fulfilled, (state, action) => {
        state.loading = false;
        state.labels = action.payload;
      })
      .addCase(fetchAllLabels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchLabelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLabelById.fulfilled, (state, action) => {
        state.loading = false;
        state.label = action.payload;
      })
      .addCase(fetchLabelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createLabel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLabel.fulfilled, (state, action) => {
        state.loading = false;
        state.labels.push(action.payload);
      })
      .addCase(createLabel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: "Tạo nhãn phim thất bại" };
      })
      .addCase(updateLabel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLabel.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.labels.findIndex(
          (label) => label.labelId === action.payload.labelId
        );
        if (index !== -1) {
          state.labels[index] = action.payload;
        }
      })
      .addCase(updateLabel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteLabel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLabel.fulfilled, (state, action) => {
        state.loading = false;
        state.labels = state.labels.filter(
          (label) => label.labelId !== action.meta.arg
        );
      })
      .addCase(deleteLabel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default labelSlice.reducer;
