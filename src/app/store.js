import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { customersReducer } from "./customersSlice";
import { employeesReducer } from "./employeesSlice";
import { ordersReducer } from "./ordersSlice";
import { uiReducer } from "./uiSlice";
import { alertReducer } from "./alertSlice";
import { contactUsReducer } from "./contactUsSlice";
import { reportsReducer } from "./reportsSlice";
import { storesReducer } from "./storesSlice";
import { authReducer } from "./auth/authSlice";
import { employeesApi } from "./api/employeesApi";
import { storesApi } from "./api/storesApi";
import { locationApi } from "./api/locationApi";
import {categoriesApi} from './api/categoriesApi'; 

const store = configureStore({
  reducer: {
    ui: uiReducer,
    orders: ordersReducer, 
    employees: employeesReducer,
    customers: customersReducer,
    alert: alertReducer,
    contactUs: contactUsReducer,
    reports: reportsReducer,
    stores: storesReducer,
    auth: authReducer,
    [employeesApi.reducerPath]: employeesApi.reducer,
    [storesApi.reducerPath]: storesApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(thunk)
      .concat(employeesApi.middleware)
      .concat(storesApi.middleware)
      .concat(locationApi.middleware)
      .concat(categoriesApi.middleware),
});

export default store;
