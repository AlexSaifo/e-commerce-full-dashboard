import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { ordersData } from "../data/dummy";

const ordersAdapter = createEntityAdapter({
  selectId: (order) => order.OrderID,
});

const initialState = ordersAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  //const response = await fetch("");
  //const orders = await response.json();
  return ordersData;
});

export const addNewOrder = createAsyncThunk(
  "orders/addNewOrder",
  async (newOrder) => {
    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    });
    const order = await response.json();
    return order;
  }
);

export const removeOrder = createAsyncThunk(
  "orders/removeOrder",
  async (orderId) => {
    const response = await fetch(`/${orderId}`, {
      method: "DELETE",
    });
    const order = await response.json();
    return order;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        ordersAdapter.setAll(state, action.payload);
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewOrder.fulfilled, (state, action) => {
        ordersAdapter.addOne(state, action.payload);
      })
      .addCase(removeOrder.fulfilled, (state, action) => {
        ordersAdapter.removeOne(state, action.payload.OrderID);
      });
  },
});


export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOrderIds,
} = ordersAdapter.getSelectors((state) => state.orders);

export const selectOrdersStatus = createSelector(
  (state) => state.orders.status,
  (status) => status
);

export const selectOrdersError = createSelector(
  (state) => state.orders.error,
  (error) => error
);

export const ordersReducer = ordersSlice.reducer;
export default ordersSlice;
