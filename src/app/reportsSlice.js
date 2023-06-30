import {
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
    createSlice,
  } from "@reduxjs/toolkit";
  import { reportsData } from "../data/dummy";
  import { setAlert } from "./alertSlice";
  
  const reportAdepter = createEntityAdapter({
    selectId: (report) => report.ID,
  });
  
  const initialState = reportAdepter.getInitialState({
    status: "idle",
    error: null,
  });
  
  export const fetchReports = createAsyncThunk(
    "reports/fetchReports",
    async () => {
      //const response = await fetch("");
      //const customers = await response.json();
      return reportsData;
    }
  );
  

  
  export const removeReport= createAsyncThunk(
    "reports/removeReport",
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
            message: "The Report has been removed successfully",
            buttonText: "Ok",
          })
        );
  
        return customer;
      } catch (error) {
        dispatch(
          setAlert({
            type: "error",
            message: `The Report has not removed successfully`,
            buttonText: "Try again",
          })
        );
        throw new Error(error.message);
      }
    }
  );
  
  export const removeMultiReport = createAsyncThunk(
    "report/removeMultiReport",
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
            message: "The Reports has been removed successfully",
            buttonText: "Ok",
          })
        );
  
        return customer;
      } catch (error) {
        dispatch(
          setAlert({
            type: "error",
            message: `The Reports has not removed successfully`,
            buttonText: "Try again",
          })
        );
        throw new Error(error.message);
      }
    }
  );
  
  const reportsSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchReports.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchReports.fulfilled, (state, action) => {
          state.status = "succeeded";
          reportAdepter.setAll(state, action.payload);
        })
        .addCase(fetchReports.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        })
        .addCase(removeReport.pending, (state) => {
          state.status = "loading";
        })
        .addCase(removeReport.fulfilled, (state, action) => {
          reportAdepter.removeAll(state, state.ids);
          reportAdepter.setAll(state, reportsData);
          //reportAdepter.removeOne(state, action.payload.ID);
        })
        .addCase(removeReport.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
          console.log(action.error.message);
        })
        .addCase(removeMultiReport.pending, (state) => {
          state.status = "loading";
        })
        .addCase(removeMultiReport.fulfilled, (state, action) => {
          reportAdepter.removeAll(state, state.ids);
          reportAdepter.setAll(state, reportsData);
          //reportAdepter.removeOne(state, action.payload.ID);
        })
        .addCase(removeMultiReport.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
          console.log(action.error.message);
        });
    },
  });
  
  export const {
    selectAll: selectAllReports,
    selectById: selectReportById,
    selectIds: selectReportsIds,
  } = reportAdepter.getSelectors((state) => state.reports);
  
  export const selectReportStatus = createSelector(
    (state) => state.reports.status,
    (status) => status
  );
  
  export const selectReportError = createSelector(
    (state) => state.reports.error,
    (error) => error
  );
  
  export const reportsReducer = reportsSlice.reducer;
  export default reportsSlice;
  