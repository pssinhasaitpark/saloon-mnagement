// src/redux/slice/contactusSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios/axios";

// GET all contacts
export const fetchContacts = createAsyncThunk(
  "contactus/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/contactus");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// GET single contact by ID
export const fetchContactById = createAsyncThunk(
  "contactus/fetchContactById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/contactus/${id}`);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// POST new contact
export const createContact = createAsyncThunk(
  "contactus/createContact",
  async (contactData, { rejectWithValue }) => {
    try {
      const res = await axios.post("/contactus", contactData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// PUT update contact
export const updateContact = createAsyncThunk(
  "contactus/updateContact",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`/contactus/${id}`, updatedData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// DELETE contact
export const deleteContact = createAsyncThunk(
  "contactus/deleteContact",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/contactus/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const contactusSlice = createSlice({
  name: "contactus",
  initialState: {
    contacts: [],
    singleContact: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSingleContact: (state) => {
      state.singleContact = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch One
      .addCase(fetchContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.singleContact = action.payload;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = [action.payload, ...state.contacts];
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.contacts.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSingleContact } = contactusSlice.actions;

export default contactusSlice.reducer;
