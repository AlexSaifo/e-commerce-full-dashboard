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
} from "@syncfusion/ej2-react-grids";
import { contactUsGrid } from "../../data/dummy";
import { useSelector } from "react-redux";
import {
  fetchContactUs,
  removeContactUs,
  removeMultiContactUs,
  selectAllContactUs,
} from "../../app/contactUsSlice";
import {
  selectAlertButtonText,
  selectAlertMessage,
  selectAlertType,
} from "../../app/alertSlice";
import Alert from "../../components/Dashboard/UI/Alert";
import { BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import store from "../../app/store";
import DataSpinner from "../DataSpinner";

const MultiContactUs = () => {
  const { dispatch } = store;
  const navigate = useNavigate();
  let gridRef = useRef(null);

  const ShowButton = () => (
    <button className="e-tbar-btn mr-1 flex items-center">
      <BiShow className="w-5 h-5 m-2" />
      <span>Show</span>
    </button>
  );

  const contactUsData = useSelector(selectAllContactUs);
  const showSpinner = contactUsData.length === 0;
  const toolbar = [
    "PdfExport",
    "Search",
    "Delete",
    { id: "Show", template: ShowButton },
  ];

  const alertAddMessage = useSelector(selectAlertMessage);
  const alertType = useSelector(selectAlertType);
  const alertButtonText = useSelector(selectAlertButtonText);

  const handleToolbarClick = (args) => {
    if (gridRef.current && args.item.id.includes("pdfexport")) {
      const selectedRecords = gridRef.current.getSelectedRecords();
      if (selectedRecords[0]) gridRef.current.pdfExport();
    } else if (args.item.id === "grid_delete") {
      const selectedRecords = gridRef.current.getSelectedRecords();

      if (selectedRecords[0]) {
        console.log(selectedRecords);
        if (selectedRecords.length === 1) {
          selectedRecords.forEach((record) =>
            dispatch(removeContactUs(record.ID))
          );
        } else {
          const ids = selectedRecords.map((record) => record.ID);
          dispatch(removeMultiContactUs(ids));
        }
      }
    } else if (
      gridRef.current.getSelectedRecords() &&
      args.item.id.includes("Show")
    ) {
      const item = gridRef.current.getSelectedRecords();
      if (item[0]) {
        const id = item[0].ID;
        navigate(`/dashboard/contact-us/${id}`);
      }
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
    <>
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
            dataSource={contactUsData}
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
              {contactUsGrid.map((item, idx) => (
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
        </>
      )}
    </>
  );
};

export default MultiContactUs;

export const contactLoader = async () => {
  try {
    setTimeout(() => {
      store.dispatch(fetchContactUs());
    }, 1500);
    return true;
  } catch (error) {
    throw Error("Could not find that Career !");
  }
};
