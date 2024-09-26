import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "utils/axios";

import { toast } from "react-toastify";

// Initial state
const initialState = {
  movies: [],
  nowShowingMovies: [],
  comingSoonMovies: [],
  movie: null,
  loading: false,
  error: null,
};

// Async thunk for fetching all movies
export const fetchAllMovies = createAsyncThunk(
  "movie/fetchAllMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/api/v1/movies/public/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching movie by ID
export const fetchMovieById = createAsyncThunk(
  "movie/fetchMovieById",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/movies/public/${movieId}`
      );
      console.log("Response", response);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for creating movie
export const createMovie = createAsyncThunk(
  "movie/createMovie",
  async (movie, { rejectWithValue }) => {
    try {
      const response = await instance.post("/api/v1/movies", movie);
      toast.success("Movie created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create movie");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating movie
export const updateMovie = createAsyncThunk(
  "movie/updateMovie",
  async (movie, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/v1/movies/${movie.movieId}`,
        movie
      );
      toast.success("Movie updated successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to update movie");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting movie
export const deleteMovie = createAsyncThunk(
  "movie/deleteMovie",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/v1/movies/${movieId}`);
      toast.success("Movie deleted successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete movie");
      return rejectWithValue(error.response.data);
    }
  }
);
export const fetchNowShowingMovies = createAsyncThunk(
  "movie/fetchNowShowingMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/movies/public/filter?keyword=0"
      ); // Assuming 0 is for NOW_SHOWING
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for fetching Coming Soon movies
export const fetchComingSoonMovies = createAsyncThunk(
  "movie/fetchComingSoonMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/movies/public/filter?keyword=1"
      ); // Assuming 1 is for COMING_SOON
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Movie slice
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movies.push(action.payload);
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.movies.findIndex(
          (movie) => movie.movieId === action.payload.movieId
        );
        if (index !== -1) {
          state.movies[index] = action.payload;
        }
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = state.movies.filter(
          (movie) => movie.movieId !== action.meta.arg
        );
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchNowShowingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNowShowingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.nowShowingMovies = action.payload; // Store fetched movies
        console.log(state.nowShowingMovies);
      })
      .addCase(fetchNowShowingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchComingSoonMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComingSoonMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.comingSoonMovies = action.payload; // Store fetched movies
        console.log(state.comingSoonMovies);
      })
      .addCase(fetchComingSoonMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default movieSlice.reducer;
