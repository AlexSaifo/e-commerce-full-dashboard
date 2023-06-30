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
  Resize,
} from "@syncfusion/ej2-react-grids";
import { reportsGrid } from "../../data/dummy";
import { useSelector, useDispatch } from "react-redux";

import {
  selectAlertButtonText,
  selectAlertMessage,
  selectAlertType,
} from "../../app/alertSlice";
import Alert from "../../components/Dashboard/UI/Alert";
import { BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  removeMultiReport,
  removeReport,
  selectAllReports,
} from "../../app/reportsSlice";

const MultiReports = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let gridRef = useRef(null);

  const ShowButton = () => (
    <button className="e-tbar-btn mr-1 flex items-center">
      <BiShow className="w-5 h-5 m-2" />
      <span>Show</span>
    </button>
  );

  const reportsData = useSelector(selectAllReports);

  console.log(reportsData);

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
      gridRef.current.pdfExport();
    } else if (args.item.id === "grid_delete") {
      const selectedRecords = gridRef.current.getSelectedRecords();
      if (selectedRecords[0]) {
        if (selectedRecords.length === 1) {
          selectedRecords.forEach((record) =>
            dispatch(removeReport(record.ID))
          );
        } else {
          const ids = selectedRecords.map((record) => record.ID);
          dispatch(removeMultiReport(ids));
        }
      }
    } else if (
      gridRef.current.getSelectedRecords() &&
      args.item.id.includes("Show")
    ) {
      const item = gridRef.current.getSelectedRecords();
      if (item[0]) {
        const id = item[0].ID;
        navigate(`/dashboard/reports/${id}`);
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
        dataSource={reportsData}
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
          {reportsGrid.map((item, idx) => (
            <ColumnDirective key={idx} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
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
  );
};

export default MultiReports;
