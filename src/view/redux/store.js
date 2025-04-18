import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import userReducer from "./slices/userauthSlice";
import adminReducer from "./slices/adminauthslice";
const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer,
    admin: adminReducer,
  },
});

export default store;
