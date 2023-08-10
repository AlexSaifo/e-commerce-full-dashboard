import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  isAdd: false,
  isDelete: false,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrders: (state, action) => {
      state.isAdd = false;
      state.orders = [...action.payload];
    },
    addOrder: (state, action) => {
      state.isAdd = true;
      // const employee = action.payload;
      // const existingEmployee = state.employees.find(
      //   (emp) => emporder.order_id === employeeorder.order_id
      // );
      // if (!existingEmployee) {
      //   state.employees.push(employee);
      // }
    },
    removeOrder: (state, action) => {
      const orderID = action.payload;
      state.orders = state.orders.filter(
        (order) => order.order_id !== orderID
      );
    },
  },
});

export const { addOrders, addOrder, removeOrder } =
  ordersSlice.actions;

export const selectAllOrders = (state) => state.orders.orders;
export const selectOrderById = (state, orderID) =>
  state.orders.orders.find((order) => order.order_id === orderID);

export const ordersReducers = ordersSlice.reducer;
export default ordersSlice;
