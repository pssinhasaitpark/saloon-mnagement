import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";

const initialState = {
  stores: [], // <-- make sure this is 'stores'
  loading: false,
  error: null,
  selectedStore: null, // To hold the fetched store by ID
};

export const fetchstore = createAsyncThunk(
  "service/fetchstore",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/store");
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// New async thunk to fetch a store by ID
export const fetchStoreById = createAsyncThunk(
  "service/fetchStoreById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/store/by-id?id=${id}`);
      // console.log("res:", res);

      return res.data.data; // Assuming the response structure is similar
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const storeslice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchstore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchstore.fulfilled, (state, action) => {
        state.loading = false;
        state.stores = action.payload; // ✅ Fix here
      })
      .addCase(fetchstore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch store";
      })
      .addCase(fetchStoreById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoreById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStore = action.payload; // Store the fetched store by ID
      })
      .addCase(fetchStoreById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch store by ID";
      });
  },
});

export default storeslice.reducer;
