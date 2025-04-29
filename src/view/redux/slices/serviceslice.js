import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";

const initialState = {
  services: [],
  storeServices: [],
  loading: false,
  error: null,
};

// GET: Fetch all services
export const fetchServices = createAsyncThunk(
  "service/fetchServices",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/service");
      return res.data.data; // Ensure this is correct
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// GET: Fetch services by storeId
export const fetchServicesByStoreId = createAsyncThunk(
  "service/fetchServicesByStoreId",
  async (storeId, thunkAPI) => {
    try {
      const res = await axios.get(`/store/services/${storeId}`);
      console.log("services:", res);

      return res.data.services; // Ensure this is correct
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// POST: Create a new service
export const createService = createAsyncThunk(
  "service/createService",
  async (newService, thunkAPI) => {
    try {
      const response = await axios.post("/service", newService);
      thunkAPI.dispatch(fetchServices());
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// PUT: Update an existing service
export const updateService = createAsyncThunk(
  "service/updateService",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.put(`/service/${id}`, updatedData);
      thunkAPI.dispatch(fetchServices());
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// DELETE: Remove a service
export const deleteService = createAsyncThunk(
  "service/deleteService",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/service/${id}`);
      thunkAPI.dispatch(fetchServices());
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all services cases
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch services";
      })
      // Fetch services by storeId cases
      .addCase(fetchServicesByStoreId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicesByStoreId.fulfilled, (state, action) => {
        state.loading = false;
        state.storeServices = action.payload;
      })
      .addCase(fetchServicesByStoreId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch services by storeId";
      })
      // Create service cases
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state) => {
        state.loading = false;
        // Don't update services here as fetchServices will be dispatched
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create service";
      })
      // Update service cases
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state) => {
        state.loading = false;
        // Don't update services here as fetchServices will be dispatched
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update service";
      })
      // Delete service cases
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state) => {
        state.loading = false;
        // Don't update services here as fetchServices will be dispatched
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete service";
      });
  },
});

export default serviceSlice.reducer;
