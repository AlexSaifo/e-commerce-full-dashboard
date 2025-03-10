import React, { useRef } from "react";
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
  ContextMenu,
  Resize,
} from "@syncfusion/ej2-react-grids";
import { customersGrid } from "../../data/dummy";
import { Header } from "../../components/Dashboard";
import { useSelector } from "react-redux";
import {
  selectAllCustomers,
  removeCustomer,
  removeCustomers,
  fetchCustomers,
} from "../../app/customersSlice";
import {
  selectAlertButtonText,
  selectAlertMessage,
  selectAlertType,
} from "../../app/alertSlice";
import Alert from "../../components/Dashboard/UI/Alert";
import DataSpinner from "../../components/DataSpinner";
import store from "../../app/store";
import { BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const Customers = () => {
  const customersData = useSelector(selectAllCustomers);
  const navigate = useNavigate();
  const showSpinner = customersData.length === 0;

  const alertAddMessage = useSelector(selectAlertMessage);
  const alertType = useSelector(selectAlertType);
  const alertButtonText = useSelector(selectAlertButtonText);

  let gridRef = useRef(null);

  const ShowButton = () => (
    <button className="e-tbar-btn mr-1 flex items-center">
      <BiShow className="w-5 h-5 m-2" />
      <span>Show</span>
    </button>
  );

  const handleToolbarClick = (args) => {
    if (gridRef.current && args.item.id.includes("pdfexport")) {
      gridRef.current.pdfExport();
    } else if (args.item.id === "grid_delete") {
      const selectedRecords = gridRef.current.getSelectedRecords();
      if (selectedRecords[0]) {
        if (selectedRecords.length === 1) {
          selectedRecords.forEach((record) =>
            store.dispatch(removeCustomer(record.CustomerID))
          );
        } else {
          const ids = selectedRecords.map((record) => record.CustomerID);
          store.dispatch(removeCustomers(ids));
        }
      }
    } else if (
      gridRef.current.getSelectedRecords() &&
      args.item.id.includes("Show")
    ) {
      const item = gridRef.current.getSelectedRecords();
      if (item[0]) {
        const id = item[0].CustomerID;
        navigate(`/dashboard/customers/${id}`);
      }
    }
  };

  const toolbar = [
    "PdfExport",
    "Search",
    "Delete",
    { id: "Show", template: ShowButton },
  ];

  const onCloseAlertRemoveHandler = () => {
    if (alertType === "info" || alertType === "pending") {
      return;
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg">
      <Header category="Page" title="Customers" />
      <DataSpinner showSpinner={showSpinner} />
      {!showSpinner && (
        <>
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
            allowFiltering
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
                ContextMenu,
                Resize,
              ]}
            />
          </GridComponent>
        </>
      )}
    </div>
  );
};

export default Customers;

export const customersLoader = async () => {
  try {
    setTimeout(() => {
      store.dispatch(fetchCustomers());
    }, 1500);
    return true;
  } catch (error) {
    throw Error("Could not find that Career !");
  }
};
