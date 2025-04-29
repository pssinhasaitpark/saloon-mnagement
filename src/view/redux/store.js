import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import userReducer from "./slices/userauthSlice";
import adminReducer from "./slices/adminauthslice";
import contactusReducer from "./slices/contactusSlice";
import packageReducer from "./slices/packageSlice";
import serviceReducer from "./slices/serviceslice";
import staffReducer from "./slices/staffSlice";
import bookingReducer from "./slices/bookingSlice";
import storesReducer from "./slices/getStoreSlice";
const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer,
    admin: adminReducer,
    contactus: contactusReducer,
    packages: packageReducer,
    services: serviceReducer,
    Staff: staffReducer,
    booking: bookingReducer,
    stores: storesReducer,
  },
});

export default store;
