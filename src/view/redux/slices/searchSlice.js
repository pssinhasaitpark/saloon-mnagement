import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPopupOpen: false,
  location: "",
  searchRadius: 10,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    openSearchPopup: (state) => {
      state.isPopupOpen = true;
    },
    closeSearchPopup: (state) => {
      state.isPopupOpen = false;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setSearchRadius: (state, action) => {
      state.searchRadius = action.payload;
    },
  },
});

export const {
  openSearchPopup,
  closeSearchPopup,
  setLocation,
  setSearchRadius,
} = searchSlice.actions;
export default searchSlice.reducer;
