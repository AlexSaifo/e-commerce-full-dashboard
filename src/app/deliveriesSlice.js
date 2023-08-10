import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveries: [],
  isAdd: false,
  isDelete: false,
};

const deliveriesSlice = createSlice({
  name: "deliveries",
  initialState,
  reducers: {
    addDeliveries: (state, action) => {
      state.isAdd = false;
      state.deliveries = [...action.payload];
    },
    addDelivery: (state, action) => {
      state.isAdd = true;
      // const employee = action.payload;
      // const existingEmployee = state.employees.find(
      //   (emp) => emp.id === employee.id
      // );
      // if (!existingEmployee) {
      //   state.employees.push(employee);
      // }
    },
    removeDelivery: (state, action) => {
      const deliveryId = action.payload;
      state.deliveries = state.deliveries.filter(
        (delivery) => delivery.id !== deliveryId
      );
    },
  },
});

export const { addDeliveries, addDelivery, removeDelivery } =
  deliveriesSlice.actions;

export const selectAllDeliveries = (state) => state.deliveries.deliveries;
export const selectDeliveryById = (state, deliveryId) =>
  state.deliveries.deliveries.find((delivery) => delivery.id === deliveryId);

export const deliveriesReducer = deliveriesSlice.reducer;
export default deliveriesSlice;
