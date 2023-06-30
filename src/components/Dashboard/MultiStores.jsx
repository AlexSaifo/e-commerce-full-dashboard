import React, { useRef, useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Toolbar,
  PdfExport,
  Search,
  Inject,
  Selection,
  Filter,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { useSelector } from "react-redux";
import {
  selectAlertButtonText,
  selectAlertMessage,
  selectAlertType,
} from "../../app/alertSlice";
import {
  fetchStores,
  removeStore,
  selectAllStores,
} from "../../app/storesSlice";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Alert from "./UI/Alert";
import { storesGrid } from "../../data/dummy";
import store from "../../app/store";
import DataSpinner from "../DataSpinner";
const Stores = () => {
  const navigate = useNavigate();
  const storesData = useSelector(selectAllStores);
  const showSpinner = storesData.length === 0;
  const { currentColor } = useSelector((state) => state.ui);

  const alertAddMessage = useSelector(selectAlertMessage);
  const alertType = useSelector(selectAlertType);
  const alertButtonText = useSelector(selectAlertButtonText);

  const toolbarOptions = ["Search", "Delete", "PdfExport"];
  const editing = { allowDeleting: true };
  const gridRef = useRef(null);
  const [isDelete, setIsDelete] = useState(false);

  const toolbarClick = (args) => {
    console.log(args, gridRef);
    if (gridRef.current && args.item.id.includes("pdfexport")) {
      gridRef.current.pdfExport();
    } else if (
      gridRef.current.getSelectedRecords()[0] &&
      args.item.id.includes("delete")
    ) {
      setIsDelete(true);
      const selectedRecords = gridRef.current.getSelectedRecords();
      selectedRecords.forEach((record) => {
        store.dispatch(removeStore(record.storeID));
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
    <>
      <DataSpinner showSpinner={showSpinner} />
      {!showSpinner && (
        <>
          <div className="flex flex-row w-full justify-end items-center mb-4 ">
            <Button
              bgColor={currentColor}
              color="white"
              bgHoverColor="light-gray"
              size="xl"
              borderRadius="1.2rem"
              text="Add New Store"
              width="auto"
              customFunc={() => {
                navigate("/dashboard/stores/add");
              }}
              className="active:scale-95"
              isValid={false}
            />
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
            dataSource={storesData}
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
              {storesGrid.map((item, index) => (
                <ColumnDirective key={index} {...item} />
              ))}
            </ColumnsDirective>
            <Inject
              services={[
                Search,
                Page,
                Toolbar,
                PdfExport,
                Selection,
                Filter,
                Sort,
              ]}
            />
          </GridComponent>
        </>
      )}
    </>
  );
};
export default Stores;

export const storesLoader = async () => {
  try {
    setTimeout(() => {
      store.dispatch(fetchStores());
    }, 1500);
    return true;
  } catch (error) {
    throw Error("Could not find that Career !");
  }
};
