import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { customersReducer } from "./customersSlice";
import { employeesReducer } from "./employeesSlice";
import { ordersReducers } from "./ordersSlice";
import { uiReducer } from "./uiSlice";
import { alertReducer } from "./alertSlice";
import { contactUsReducer } from "./contactUsSlice";
import { reportsReducer } from "./reportsSlice";
import { storesReducer } from "./storesSlice";
import { authReducer } from "./auth/authSlice";
import { employeesApi } from "./api/employeesApi";
import { storesApi } from "./api/storesApi";
import { locationApi } from "./api/locationApi";
import { categoriesApi } from "./api/categoriesApi";
import { itemsApi } from "./api/itemsApi";
import { deliveriesApi } from "./api/deliveriesApi";
import { deliveriesReducer } from "./deliveriesSlice";
import { ordersApi } from "./api/ordersApi";
import { transactionsApi } from "./api/transactionsApi";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    orders: ordersReducers,
    employees: employeesReducer,
    customers: customersReducer,
    alert: alertReducer,
    contactUs: contactUsReducer,
    reports: reportsReducer,
    stores: storesReducer,
    auth: authReducer,
    deliveries: deliveriesReducer,
    [employeesApi.reducerPath]: employeesApi.reducer,
    [storesApi.reducerPath]: storesApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [deliveriesApi.reducerPath]: deliveriesApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(thunk)
      .concat(employeesApi.middleware)
      .concat(storesApi.middleware)
      .concat(locationApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(itemsApi.middleware)
      .concat(deliveriesApi.middleware)
      .concat(ordersApi.middleware)
      .concat(transactionsApi.middleware),
});

export default store;
