import { configureStore } from "@reduxjs/toolkit";
import { customersReducer } from "./customersSlice";
import { employeesReducer } from "./employeesSlice";
import { ordersReducer } from "./ordersSlice";
import { uiReducer } from "./uiSlice";
import { alertReducer } from "./alertSlice";



const store = configureStore({
  reducer: {
    ui: uiReducer,
    orders: ordersReducer,
    employees: employeesReducer,
    customers: customersReducer,
    alert: alertReducer,
  },

});

export default store;
