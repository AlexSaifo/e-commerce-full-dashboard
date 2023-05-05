import React, { useEffect, useRef } from "react";
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
  Sort,
  Filter,
  Selection,
} from "@syncfusion/ej2-react-grids";
import { customersGrid } from "../../data/dummy";
import { Header } from "../../components/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllCustomers,
  removeCustomer,
  selectCustomersStatus,
  selectCustomersError,
  removeCustomers,
} from "../../app/customersSlice";
import {
  selectAlertButtonText,
  selectAlertMessage,
  selectAlertType,
} from "../../app/alertSlice";
import Alert from "../../components/Dashboard/UI/Alert";

const Grid_Paging = "grid_Paging";
const Grid_Sorting = "grid_Sorting";
const Grid_Filtering = "grid_Filtering";
const Grid_Add = "grid_Add";
const Grid_Editing = "grid_Editing";
const Grid_Delete = "grid_Delete";

const Customers = () => {
  const customersData = useSelector(selectAllCustomers);

  const alertAddMessage = useSelector(selectAlertMessage);
  const alertType = useSelector(selectAlertType);
  const alertButtonText = useSelector(selectAlertButtonText);

  const dispatch = useDispatch();
  let gridRef = useRef(null);

  const handleToolbarClick = (args) => {
    if (args.item.id === "grid_delete") {
      const selectedRecords = gridRef.current.getSelectedRecords();
      console.log(selectedRecords);
      if (selectedRecords.length === 1) {
        selectedRecords.forEach((record) =>
          dispatch(removeCustomer(record.CustomerID))
        );
      } else {
        const ids = selectedRecords.map((record) => record.CustomerID);
        dispatch(removeCustomers(ids));
      }
    }
  };

  const toolbar = ["PdfExport", "Search", "Delete"];

  const onCloseAlertRemoveHandler = () => {
    if (alertType === "info" || alertType === "pending") {
      return;
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      {alertAddMessage && (
        <Alert
          type={alertType}
          message={alertAddMessage}
          buttonText={alertButtonText}
          onClose={onCloseAlertRemoveHandler}
        />
      )}
      <GridComponent
        id="grid"
        dataSource={customersData}
        toolbar={toolbar}
        allowPdfExport
        toolbarClick={handleToolbarClick}
        ref={gridRef}
        allowPaging
        allowSorting
        allowSelection
        editSettings={{ allowDeleting: true }}
        width="auto"
      >
        <ColumnsDirective>
          {customersGrid.map((item, idx) => (
            <ColumnDirective key={idx} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Toolbar,
            Selection,
            Search,
            Page,
            Edit,
            Sort,
            Filter,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default Customers;
