import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";

const initialState = {
  packages: [],
  loading: false,
  error: null,
};

// GET: Fetch all packages
export const fetchPackages = createAsyncThunk(
  "package/fetchPackages",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/package");
      return res.data.data; // Assuming the response structure is { success: true, data: [...] }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// POST: Create new package
export const createPackage = createAsyncThunk(
  "package/createPackage",
  async (newPackage, thunkAPI) => {
    try {
      const response = await axios.post("/package/create", newPackage);
      thunkAPI.dispatch(fetchPackages()); // Refresh the package list
      return response.data; // Return the created package data if needed
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// PUT: Update existing package
export const updatePackage = createAsyncThunk(
  "package/updatePackage",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`/package/${id}`, updatedData);
      thunkAPI.dispatch(fetchPackages()); // Refresh the package list
      return response.data; // Return the updated package data if needed
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// DELETE: Remove a package
export const deletePackage = createAsyncThunk(
  "package/deletePackage",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/package/${id}`);
      thunkAPI.dispatch(fetchPackages()); // Refresh the package list
      return response.data; // Return the response if needed
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch packages
      .addCase(fetchPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload; // Store fetched packages
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch packages";
      })

      // Create package
      .addCase(createPackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPackage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createPackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create package";
      })

      // Update package
      .addCase(updatePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePackage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update package";
      })

      // Delete package
      .addCase(deletePackage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePackage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePackage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete package";
      });
  },
});

export default packageSlice.reducer;
