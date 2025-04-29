// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../axios/axios";

// const initialState = {
//   staff: [],
//   loading: false,
//   error: null,
// };

// // GET: Fetch specialists by ID and type (e.g. store)
// export const fetchStaff = createAsyncThunk(
//   "Staff/fetchStaff",
//   async ({ id, type }) => {
//     const res = await axios.get(`/user/specialist`, {
//       params: { id, type },
//     });
//     console.log("staff from slice;", res.data);

//     return res.data;
//   }
// );

// // POST: Create new specialist
// export const createStaff = createAsyncThunk(
//   "Staff/createStaff",
//   async (newStaf, { dispatch }) => {
//     const response = await axios.post("/user/specialist", newStaf);
//     dispatch(fetchStaff({ id: newStaf.storeId, type: "store" }));
//     return response.data;
//   }
// );

// // PUT: Update existing specialist
// export const updateStaff = createAsyncThunk(
//   "Staff/updateStaff",
//   async ({ id, updatedData }, { dispatch }) => {
//     const response = await axios.put(`/specialist/${id}`, updatedData);
//     dispatch(fetchStaff({ id: updatedData.storeId, type: "store" }));
//     return response.data;
//   }
// );

// // DELETE: Remove a specialist
// export const deleteStaff = createAsyncThunk(
//   "Staff/deleteStaff",
//   async ({ id, storeId }, { dispatch }) => {
//     const response = await axios.delete(`/user/${id}`);
//     dispatch(fetchStaff({ id: storeId, type: "store" }));
//     return response.data;
//   }
// );

// const stafSlice = createSlice({
//   name: "Staff",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchStaff.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchStaff.fulfilled, (state, action) => {
//         console.log("action.payload", action.payload.specialists);

//         state.loading = false;
//         state.staff = action.payload.specialists;
//       })
//       .addCase(fetchStaff.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to fetch specialists";
//       })
//       .addCase(createStaff.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createStaff.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(createStaff.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to create specialist";
//       })
//       .addCase(updateStaff.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateStaff.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(updateStaff.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to update specialist";
//       })
//       .addCase(deleteStaff.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteStaff.fulfilled, (state) => {
//         state.loading = false;
//       })
//       .addCase(deleteStaff.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Failed to delete specialist";
//       });
//   },
// });

// export default stafSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";

const initialState = {
  staff: [],
  loading: false,
  error: null,
};

// GET: Fetch specialists by ID and type (e.g. store)
export const fetchStaff = createAsyncThunk(
  "Staff/fetchStaff",
  async ({ id, type }) => {
    const res = await axios.get(`/user/specialist`, {
      params: { id, type },
    });
    console.log("staff from slice;", res.data);

    return res.data;
  }
);

// POST: Create new specialist
export const createStaff = createAsyncThunk(
  "Staff/createStaff",
  async (newStaff, { dispatch, rejectWithValue }) => {
    try {
      // Log headers and data for debugging
      console.log("Creating staff with data:", newStaff);

      // For FormData objects, ensure Content-Type is set correctly
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post("/user/specialist", newStaff, config);

      console.log("Staff creation response:", response.data);

      // Extract storeId for fetching updated staff list
      let storeId;
      if (newStaff instanceof FormData) {
        storeId = newStaff.get("storeId");
      } else {
        storeId = newStaff.storeId;
      }

      if (storeId) {
        // Dispatch should happen after successful response
        dispatch(fetchStaff({ id: storeId, type: "store" }));
      }

      return response.data;
    } catch (error) {
      console.error("Error in createStaff thunk:", error);
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// PUT: Update existing specialist
export const updateStaff = createAsyncThunk(
  "Staff/updateStaff",
  async ({ id, updatedData }, { dispatch, rejectWithValue }) => {
    try {
      // For FormData objects, ensure Content-Type is set correctly
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.put(
        `/user/specialist/${id}`,
        updatedData,
        config
      );

      // Extract storeId for fetching updated staff list
      let storeId;
      if (updatedData instanceof FormData) {
        storeId = updatedData.get("storeId");
      } else {
        storeId = updatedData.storeId;
      }

      if (storeId) {
        dispatch(fetchStaff({ id: storeId, type: "store" }));
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// DELETE: Remove a specialist
export const deleteStaff = createAsyncThunk(
  "Staff/deleteStaff",
  async ({ id, storeId }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(`/user/specialist/${id}`);

      if (storeId) {
        dispatch(fetchStaff({ id: storeId, type: "store" }));
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const staffSlice = createSlice({
  name: "Staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.loading = false;
        // Handle different response structures
        state.staff = action.payload.specialists || action.payload.data || [];
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch specialists";
      })
      .addCase(createStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStaff.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error.message ||
          "Failed to create specialist";
      })
      .addCase(updateStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStaff.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error.message ||
          "Failed to update specialist";
      })
      .addCase(deleteStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStaff.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.error.message ||
          "Failed to delete specialist";
      });
  },
});

export default staffSlice.reducer;
