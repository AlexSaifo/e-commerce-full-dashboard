import React, { useRef, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Toolbar,
  PdfExport,
  Edit,
  Search,
  Inject,
  Selection,
  Filter,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { employeesData, employeesGrid } from "../../data/dummy";
import { Header } from "../../components/Dashboard";
import { removeEmployee, selectAllEmployees } from "../../app/employeesSlice";
import { useDispatch } from "react-redux";

import NewEmployee from "../../components/Dashboard/NewEmployee";
import { useSelector } from "react-redux";
import {
  selectAlertButtonText,
  selectAlertMessage,
  selectAlertType,
} from "../../app/alertSlice";
import Alert from "../../components/Dashboard/UI/Alert";
const Employees = () => {
  const dispatch = useDispatch();

  const alertAddMessage = useSelector(selectAlertMessage);
  const alertType = useSelector(selectAlertType);
  const alertButtonText = useSelector(selectAlertButtonText);
  const { currentColor } = useSelector((state) => state.ui);

  const toolbarOptions = ["Search", "Delete", "PdfExport"];
  const editing = { allowDeleting: true };
  const gridRef = useRef(null);
  const [isDelete, setIsDelete] = useState(false);

  const toolbarClick = (args) => {
    console.log(args , gridRef)
    if (gridRef.current && args.item.id.includes("pdfexport")) {
      gridRef.current.pdfExport();
    } else if (
      gridRef.current.getSelectedRecords()[0] &&
      args.item.id.includes("delete")
    ) {
      setIsDelete(true);
      const selectedRecords = gridRef.current.getSelectedRecords();
      selectedRecords.forEach((record) => {
        dispatch(removeEmployee(record.EmployeeID));
      });
      gridRef.current.refresh();
    }
  };

  const onCloseAlertRemoveHandler = () => {
    if (alertType === "info" || alertType === "pending") {
      return;
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
      <div className="flex flex-row w-full justify-end items-center mb-4 ">
        <NewEmployee />
        {alertAddMessage && isDelete && (
          <Alert
            type={alertType}
            message={alertAddMessage}
            buttonText={alertButtonText}
            onClose={onCloseAlertRemoveHandler}
          />
        )}
      </div>
      <GridComponent
        ref={gridRef}
        dataSource={employeesData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
        allowPdfExport={true}
        toolbarClick={toolbarClick}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Search, Page, Toolbar, PdfExport, Selection, Filter, Sort]}
        />
      </GridComponent>
    </div>
  );
};
export default Employees;
