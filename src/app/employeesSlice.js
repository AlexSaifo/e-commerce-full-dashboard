import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { randomId } from "@syncfusion/ej2/diagrams";
import { employeesData } from "../data/dummy";
import { setAlert } from "./alertSlice";

const employeesAdapter = createEntityAdapter({
  selectId: (employee) => employee.EmployeeID,
});

const initialState = employeesAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    //const response = await fetch("");
    //const employees = await response.json();
    return employeesData;
  }
);

export const addNewEmployee = createAsyncThunk(
  "employees/addNewEmployee",
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
          message: "The employee has been added successfully",
          buttonText: "Ok",
        })
      );

      return employee;
    } catch (error) {
      dispatch(
        setAlert({
          type: "error",
          message: `The employee has not added successfully`,
          buttonText: "Try again",
        })
      );
      throw new Error(error.message);
    }
  }
);

export const removeEmployee = createAsyncThunk(
  "employees/removeEmployee",
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
          message: "The employee has been removed successfully",
          buttonText: "Ok",
        })
      );

      return employee;
    } catch (error) {
      
    }
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        employeesAdapter.setAll(state, action.payload);
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addNewEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action);
        employeesAdapter.removeAll(state, state.ids);
        employeesAdapter.setAll(state, employeesData);
      })
      .addCase(addNewEmployee.rejected, (state, action) => {
        state.status = "failed";
        console.log(action);
        state.error = action.error.message;
      })
      .addCase(removeEmployee.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action);
        employeesAdapter.removeAll(state, state.ids);
        employeesAdapter.setAll(state, employeesData);
        //employeesAdapter.removeOne(state, action.payload.EmployeeID);
      })
      .addCase(removeEmployee.rejected, (state, action) => {
        state.status = "failed";
        console.log(action);
        state.error = action.error.message;
        //employeesAdapter.removeOne(state, action.payload.EmployeeID);
      });
  },
});

//removeEmployee

export const {
  selectAll: selectAllEmployees,
  selectById: selectEmployeeById,
  selectIds: selectEmployeeIds,
} = employeesAdapter.getSelectors((state) => state.employees);

export const selectEmployeessStatus = createSelector(
  (state) => state.status,
  (status) => status
);

export const selectEmployeessError = createSelector(
  (state) => state.error,
  (error) => error
);

export const employeesReducer = employeesSlice.reducer;
export default employeesSlice;
