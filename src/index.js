import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";

import "./index.css";

import store from "./app/store";
import { fetchOrders } from "./app/ordersSlice";
import { fetchEmployees } from "./app/employeesSlice";
import { fetchCustomers } from "./app/customersSlice";

store.dispatch(fetchOrders());
store.dispatch(fetchEmployees());
store.dispatch(fetchCustomers());


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
