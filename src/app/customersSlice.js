import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { customersData } from "../data/dummy";
import { setAlert } from "./alertSlice";

const customersAdapter = createEntityAdapter({
  selectId: (customer) => customer.CustomerID,
});

const initialState = customersAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    //const response = await fetch("");
    //const customers = await response.json();
    return customersData;
  }
);

export const addNewCustomer = createAsyncThunk(
  "customers/addNewCustomer",
  async (newCustomer) => {
    const response = await fetch("", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCustomer),
    });
    const customer = await response.json();
    return customer;
  }
);

export const removeCustomer = createAsyncThunk(
  "customers/removeCustomer",
  async (customerId, { dispatch }) => {
    dispatch(
      setAlert({
        type: "pending",
        message: "Pending Error",
        buttonText: "Ok",
      })
    );

    try {
      const response = await fetch(
        `https://react-http-a7870-default-rtdb.firebaseio.com/employees/${"1"}.json`,
        {
          method: "DELETE",
        }
      );

      const customer = await response.json();

      dispatch(
        setAlert({
          type: "success",
          message: "The customer has been removed successfully",
          buttonText: "Ok",
        })
      );

      return customer;
    } catch (error) {
      dispatch(
        setAlert({
          type: "error",
          message: `The customer has not removed successfully`,
          buttonText: "Try again",
        })
      );
      throw new Error(error.message);
    }
  }
);

export const removeCustomers = createAsyncThunk(
  "customers/removeCustomers",
  async (customersId, { dispatch }) => {
    dispatch(
      setAlert({
        type: "pending",
        message: "Pending Error",
        buttonText: "Ok",
      })
    );

    try {
      const response = await fetch(
        `https://react-http-a7870-default-rtdb.firebaseio.com/employees/${"1"}.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customersId),
        }
      );

      const customer = await response.json();

      dispatch(
        setAlert({
          type: "success",
          message: "The customers has been removed successfully",
          buttonText: "Ok",
        })
      );

      return customer;
    } catch (error) {
      dispatch(
        setAlert({
          type: "error",
          message: `The customers has not removed successfully`,
          buttonText: "Try again",
        })
      );
      throw new Error(error.message);
    }
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "succeeded";
        customersAdapter.setAll(state, action.payload);
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewCustomer.fulfilled, (state, action) => {
        customersAdapter.addOne(state, action.payload);
      })
      .addCase(removeCustomer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCustomer.fulfilled, (state, action) => {
        customersAdapter.removeAll(state, state.ids);
        customersAdapter.setAll(state, customersData);
        //customersAdapter.removeOne(state, action.payload.CustomerID);
      })
      .addCase(removeCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log(action.error.message);
      })
      .addCase(removeCustomers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeCustomers.fulfilled, (state, action) => {
        customersAdapter.removeAll(state, state.ids);
        customersAdapter.setAll(state, customersData);
        //customersAdapter.removeOne(state, action.payload.CustomerID);
      })
      .addCase(removeCustomers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        console.log(action.error.message);
      });
  },
});

export const {
  selectAll: selectAllCustomers,
  selectById: selectCustomerById,
  selectIds: selectCustomerIds,
} = customersAdapter.getSelectors((state) => state.customers);

export const selectCustomersStatus = createSelector(
  (state) => state.customers.status,
  (status) => status
);

export const selectCustomersError = createSelector(
  (state) => state.customers.error,
  (error) => error
);

export const customersReducer = customersSlice.reducer;
export default customersSlice;
