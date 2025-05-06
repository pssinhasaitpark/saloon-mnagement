import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";
export const fetchgallerys = createAsyncThunk(
  "gallery/fetchgallerys",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/gallery/store-branch?id=${id}`);
      console.log("response Gallery", response);

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

// Slice
const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    gallerys: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchgallerys.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchgallerys.fulfilled, (state, action) => {
        state.loading = false;
        state.gallerys = action.payload;
      })
      .addCase(fetchgallerys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default gallerySlice.reducer;
