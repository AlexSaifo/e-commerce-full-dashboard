import { configureStore } from "@reduxjs/toolkit";
import { customersReducer } from "./customersSlice";
import { employeesReducer } from "./employeesSlice";
import { ordersReducer } from "./ordersSlice";
import { uiReducer } from "./uiSlice";
import { alertReducer } from "./alertSlice";
import { contactUsReducer } from "./contactUsSlice";
import { reportsReducer } from "./reportsSlice";
import { storesReducer } from "./storesSlice";



const store = configureStore({
  reducer: {
    ui: uiReducer,
    orders: ordersReducer,
    employees: employeesReducer,
    customers: customersReducer,
    alert: alertReducer,
    contactUs:contactUsReducer,
    reports:reportsReducer,
    stores:storesReducer,
  },
});

export default store;
