import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
  } from "@reduxjs/toolkit";
  import { contactUsData } from "../data/dummy";
  import { setAlert } from "./alertSlice";
  
  const contactUsAdapter = createEntityAdapter({
    selectId: (contact) => contact.ID,
  });
  
  const initialState = contactUsAdapter.getInitialState({
    status: "idle",
    error: null,
  });
  
  export const fetchContactUs = createAsyncThunk(
    "contactUs/fetchContactUs",
    async () => {
      //const response = await fetch("");
      //const customers = await response.json();
      return contactUsData;
    }
  );
  

  
  export const removeContactUs= createAsyncThunk(
    "contactUs/removeContactUs",
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
            message: "The Contact has been removed successfully",
            buttonText: "Ok",
          })
        );
  
        return customer;
      } catch (error) {
        dispatch(
          setAlert({
            type: "error",
            message: `The Contact has not removed successfully`,
            buttonText: "Try again",
          })
        );
        throw new Error(error.message);
      }
    }
  );
  
  export const removeMultiContactUs = createAsyncThunk(
    "contactUs/removeMultiContactUs",
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
            message: "The Contacts has been removed successfully",
            buttonText: "Ok",
          })
        );
  
        return customer;
      } catch (error) {
        dispatch(
          setAlert({
            type: "error",
            message: `The Contacts has not removed successfully`,
            buttonText: "Try again",
          })
        );
        throw new Error(error.message);
      }
    }
  );
  
  const contactUsSlice = createSlice({
    name: "contactUs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchContactUs.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchContactUs.fulfilled, (state, action) => {
          state.status = "succeeded";
          contactUsAdapter.setAll(state, action.payload);
        })
        .addCase(fetchContactUs.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
        .addCase(removeContactUs.pending, (state) => {
          state.status = "loading";
        })
        .addCase(removeContactUs.fulfilled, (state, action) => {
          contactUsAdapter.removeAll(state, state.ids);
          contactUsAdapter.setAll(state, contactUsData);
          //contactUsAdapter.removeOne(state, action.payload.ID);
        })
        .addCase(removeContactUs.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
          console.log(action.error.message);
        })
        .addCase(removeMultiContactUs.pending, (state) => {
          state.status = "loading";
        })
        .addCase(removeMultiContactUs.fulfilled, (state, action) => {
          contactUsAdapter.removeAll(state, state.ids);
          contactUsAdapter.setAll(state, contactUsData);
          //contactUsAdapter.removeOne(state, action.payload.ID);
        })
        .addCase(removeMultiContactUs.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
          console.log(action.error.message);
        });
    },
  });
  
  export const {
    selectAll: selectAllContactUs,
    selectById: selectContactUsById,
    selectIds: selectContactUsIds,
  } = contactUsAdapter.getSelectors((state) => state.contactUs);
  
  export const selectContactUsStatus = createSelector(
    (state) => state.contactUs.status,
    (status) => status
  );
  
  export const selectContactUsError = createSelector(
    (state) => state.contactUs.error,
    (error) => error
  );
  
  export const contactUsReducer = contactUsSlice.reducer;
  export default contactUsSlice;
  