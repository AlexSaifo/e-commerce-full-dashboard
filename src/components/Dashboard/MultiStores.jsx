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
  ExcelExport,
} from "@syncfusion/ej2-react-grids";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAlertButtonText,
  selectAlertMessage,
  selectAlertType,
  setAlert,
} from "../../app/alertSlice";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Alert from "./UI/Alert";
import { storesGrid } from "../../data/dummy";
import DataSpinner from "../DataSpinner";
import {
  useFetchStoresQuery,
  useRemoveStoreMutation,
} from "../../app/api/storesApi";
import { useEffect } from "react";
import { addStores, selectAllStores } from "../../app/storesSlice";
import { BiShow } from "react-icons/bi";

const Stores = () => {
  const navigate = useNavigate();

  const {
    data: allStores,
    isSuccess,
    isLoading,
    isError,
    error: fetchError,
    refetch,
  } = useFetchStoresQuery();

  const [
    deleteStore,
    {
      isLoading: removeIsLoading,
      isSuccess: removeIsSuccess,
      isError: removeIsError,
      error: removeError,
    },
  ] = useRemoveStoreMutation();

  const storesData = useSelector(selectAllStores);
  const { currentColor } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const alertAddMessage = useSelector(selectAlertMessage);
  const alertType = useSelector(selectAlertType);
  const alertButtonText = useSelector(selectAlertButtonText);

  const editing = { allowDeleting: true };
  const gridRef = useRef(null);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (isSuccess && !removeIsError) {
      dispatch(addStores(allStores?.data));
    }
  }, [isSuccess]);
  useEffect(() => {
    if (removeIsSuccess) {
      dispatch(
        setAlert({
          message: "Store Remove Successfully",
          type: "success",
          buttonText: "ok",
        })
      );
    } else if (removeIsError) {
      console.log('removeIsError' , removeError?.data.errors.errors);
      dispatch(
        setAlert({
          message: removeError?.data.errors.errors,
          type: "error",
          buttonText: "ok",
        })
      );
    }
  }, [removeIsSuccess, removeIsError]);

  const ShowButton = () => (
    <button className="e-tbar-btn mr-1 flex items-center">
      <BiShow className="w-5 h-5 m-2" />
      <span>Show</span>
    </button>
  );

  const toolbarOptions = [
    "Search",
    "Delete",
    "PdfExport",
    "ExcelExport",
    { id: "Show", template: ShowButton },
  ];
  const toolbarClick = (args) => {
    console.log(args, gridRef);
    if (gridRef.current && args.item.id.includes("pdfexport")) {
      gridRef.current.pdfExport();
    } else if (gridRef.current && args.item.id.includes("excelexport")) {
      gridRef.current.excelExport();
    } else if (
      gridRef.current.getSelectedRecords()[0] &&
      args.item.id.includes("delete")
    ) {
      setIsDelete(true);
      const selectedRecords = gridRef.current.getSelectedRecords();
      selectedRecords.forEach((record) => {
        deleteStore(record.store_id);
      });
      gridRef.current.refresh();
    } else if (
      gridRef.current.getSelectedRecords() &&
      args.item.id.includes("Show")
    ) {
      const item = gridRef.current.getSelectedRecords();
      if (item[0]) {
        const id = item[0].store_id;
        navigate(`/dashboard/stores/${id}/show`);
      }
    }
  };

  const onCloseAlertRemoveHandler = () => {
    if (alertType === "success") {
      refetch();
    }
    return;
  };

  if (removeIsLoading || isLoading) {
    return <DataSpinner showSpinner={isLoading || removeIsLoading} />;
  }

  return (
    <>
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
          {alertAddMessage && (
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
          dataSource={allStores?.data}
          width="100%"
          allowPaging
          allowSorting
          pageSettings={{ pageCount: 5 }}
          editSettings={editing}
          toolbar={toolbarOptions}
          allowPdfExport={true}
          allowExcelExport={true}
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
              ExcelExport,
            ]}
          />
        </GridComponent>
      </>
    </>
  );
};
export default Stores;
