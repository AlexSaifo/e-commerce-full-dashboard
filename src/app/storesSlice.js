import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
  } from "@reduxjs/toolkit";
  import { randomId } from "@syncfusion/ej2/diagrams";
  import { storesData } from "../data/dummy";
  import { setAlert } from "./alertSlice";
  
  const storesAdapter = createEntityAdapter({
    selectId: (store) => store.storeID,
  });
  
  const initialState = storesAdapter.getInitialState({
    status: "idle",
    error: null,
  });
  
  export const fetchStores = createAsyncThunk(
    "stores/fetchStores",
    async () => {
      //const response = await fetch("");
      //const employees = await response.json();
      return storesData;
    }
  );
  
  export const addNewEmployee = createAsyncThunk(
    "stores/addNewEmployee",
    async (payload, { dispatch }) => {
      dispatch(
        setAlert({
          type: "pending",
          message: "Pending",
          buttonText: "Ok",
        })
      );
  
      try {
        const response = await fetch(
          `https://react-http-a7870-default-rtdb.firebaseio.com/employees/e${randomId()}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload.newEmployee),
          }
        );
        const employee = await response.json();
  
        dispatch(
          setAlert({
            type: "success",
            message: "The store has been added successfully",
            buttonText: "Ok",
          })
        );
  
        return employee;
      } catch (error) {
        dispatch(
          setAlert({
            type: "error",
            message: `The store has not added successfully`,
            buttonText: "Try again",
          })
        );
        throw new Error(error.message);
      }
    }
  );
  
  export const removeStore = createAsyncThunk(
    "stores/removeStore",
    async (employeeId, { dispatch }) => {
      dispatch(
        setAlert({
          type: "pending",
          message: "Pending Error",
          buttonText: "Ok",
        })
      );
  
      try {
        const response = await fetch(`https://react-http-a7870-default-rtdb.firebaseio.com/employees/${'esc7sf'}.json`, {
          method: "DELETE",
        });
        const employee = await response.json();
  
        dispatch(
          setAlert({
            type: "success",
            message: "The store has been removed successfully",
            buttonText: "Ok",
          })
        );
  
        return employee;
      } catch (error) {
        
      }
    }
  );
  
  const storesSlice = createSlice({
    name: "stores",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchStores.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchStores.fulfilled, (state, action) => {
          state.status = "succeeded";
          storesAdapter.setAll(state, action.payload);
        })
        .addCase(fetchStores.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
        .addCase(addNewEmployee.pending, (state) => {
          state.status = "loading";
        })
        .addCase(addNewEmployee.fulfilled, (state, action) => {
          state.status = "succeeded";
          console.log(action);
          storesAdapter.removeAll(state, state.ids);
          storesAdapter.setAll(state, storesData);
        })
        .addCase(addNewEmployee.rejected, (state, action) => {
          state.status = "failed";
          console.log(action);
          state.error = action.error.message;
        })
        .addCase(removeStore.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(removeStore.fulfilled, (state, action) => {
          state.status = "succeeded";
          console.log(action);
          storesAdapter.removeAll(state, state.ids);
          storesAdapter.setAll(state, storesData);
          //storesAdapter.removeOne(state, action.payload.EmployeeID);
        })
        .addCase(removeStore.rejected, (state, action) => {
          state.status = "failed";
          console.log(action);
          state.error = action.error.message;
          //storesAdapter.removeOne(state, action.payload.EmployeeID);
        });
    },
  });
  
  //removeStore
  
  export const {
    selectAll: selectAllStores,
    selectById: selectStoreById,
    selectIds: selectStoresIds,
  } = storesAdapter.getSelectors((state) => state.stores);
  
  export const selectStoresStatus = createSelector(
    (state) => state.status,
    (status) => status
  );
  
  export const selectStoresError = createSelector(
    (state) => state.error,
    (error) => error
  );
  
  export const storesReducer = storesSlice.reducer;
  export default storesSlice;
  