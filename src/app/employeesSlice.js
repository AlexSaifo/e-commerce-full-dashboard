import { createSlice } from "@reduxjs/toolkit";
import { employeesData } from "../data/dummy";

const initialState = {
  employees: [],
  isAdd :false,
  isDelete:false,
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployees: (state, action) => {
      state.isAdd = false; 
      state.employees = [...action.payload];
    },
    addEmployee: (state, action) => {
      state.isAdd = true;
      // const employee = action.payload;
      // const existingEmployee = state.employees.find(
      //   (emp) => emp.id === employee.id
      // );
      // if (!existingEmployee) {
      //   state.employees.push(employee);
      // }
    },
    removeEmployee: (state, action) => {
      const employeeId = action.payload;
      state.employees = state.employees.filter(
        (employee) => employee.id !== employeeId
      );
    },
  },
});

export const { addEmployee, addEmployees, removeEmployee } =
  employeesSlice.actions;

export const selectAllEmployees = (state) => state.employees.employees;
export const selectEmployeeById = (state, employeeId) =>
  state.employees.employees.find((employee) => employee.id === employeeId);

export const employeesReducer = employeesSlice.reducer;
export default employeesSlice;
