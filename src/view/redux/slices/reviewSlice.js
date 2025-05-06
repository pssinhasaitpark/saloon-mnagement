import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";

// Async Thunks
export const createReviews = createAsyncThunk(
  "booking/createReviews",
  async (reviewData, thunkAPI) => {
    try {
      const response = await axios.post("/review", reviewData);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const fetchReviews = createAsyncThunk(
  "review/fetchReviews",
  async (id, thunkAPI) => {
    try {
      const response = axios.get(`/review?storeId=${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteReviews = createAsyncThunk(
  "review/deleteReviews",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/review/delete/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
// Slice
const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload);
      })
      .addCase(createReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteReviews.fulfilled, (state, action) => {
        state.reviews = state.reviews.filter((b) => b._id !== action.payload);
      });
  },
});

export default reviewSlice.reducer;
