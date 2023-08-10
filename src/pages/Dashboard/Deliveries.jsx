import React, { useEffect, useRef, useState } from "react";
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
import { deliveriesGrid } from "../../data/dummy";
import { Header } from "../../components/Dashboard";

import { useDispatch } from "react-redux";

import NewEmployee from "../../components/Dashboard/NewEmployee";
import { useSelector } from "react-redux";
import {
  selectAlertButtonText,
  selectAlertMessage,
  selectAlertType,
} from "../../app/alertSlice";
import Alert from "../../components/Dashboard/UI/Alert";
import DataSpinner from "../../components/DataSpinner";
import store from "../../app/store";
import { useFetchEmployeesQuery } from "../../app/api/employeesApi";
import {
  useFetchDeliveriesQuery,
  useRemoveDeliveryMutation,
} from "../../app/api/deliveriesApi";
import {
  addDeliveries,
  removeDelivery,
  selectAllDeliveries,
} from "../../app/deliveriesSlice";
import NewDelivery from "../../components/Dashboard/NewDelivery";

const Deliveries = () => {
  const dispatch = useDispatch();
  const { isAdd } = useSelector((state) => state.deliveries);

  const {
    data: dataDeliveries,
    isError,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useFetchDeliveriesQuery({ refetchOnMountOrArgChange: isAdd });

  const [
    deletDelivery,
    {
      isError: deletIsError,
      isLoading: deletIsLoading,
      isSuccess: deletIsSuccess,
      error: deletError,
    },
  ] = useRemoveDeliveryMutation();

  const deliveriesData = useSelector((state) => selectAllDeliveries(state));

  useEffect(() => {
    if (isSuccess) {
      dispatch(addDeliveries(dataDeliveries?.data));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (deletIsSuccess) {
      refetch();
    }
  }, [deletIsSuccess]);

  console.log(dataDeliveries?.data);

  const showSpinner = isLoading || deletIsLoading;

  const alertAddMessage = useSelector(selectAlertMessage);
  const alertType = useSelector(selectAlertType);
  const alertButtonText = useSelector(selectAlertButtonText);

  const toolbarOptions = ["Search", "Delete", "PdfExport", "ExcelExport"];
  const editing = { allowDeleting: true };
  const gridRef = useRef(null);
  const [isDelete, setIsDelete] = useState(false);

  const toolbarClick = async (args) => {
    console.log(args, gridRef);
    if (gridRef.current && args.item.id.includes("pdfexport")) {
      gridRef.current.pdfExport();
    } else if (gridRef.current && args.item.id.includes("excel")) {
      gridRef.current.excelExport();
    } else if (
      gridRef.current.getSelectedRecords()[0] &&
      args.item.id.includes("delete")
    ) {
      const selectedRecords = gridRef.current.getSelectedRecords();
      if (selectedRecords[0]) {
        setIsDelete(true);
        selectedRecords.forEach((record) => {
          // dispatch(removeDelivery(record.delivary_id));
        });
        const response = await deletDelivery(selectedRecords[0].delivary_id);
        gridRef.current.refresh();
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

  if (isLoading) {
    return (
      <>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg">
          <Header category="Inner Pages" title="Deliveries" />
          <DataSpinner showSpinner={true} />
        </div>
      </>
    );
  }
  if (error || deletError) {
    return (
      <Alert
        type={"error"}
        message={error?.message || deletError?.data?.message}
        buttonText={"Refresh"}
        onClose={refetch}
      />
    );
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg">
      <Header category="Inner Pages" title="Deliveries" />
      <div className="flex flex-row w-full justify-end items-center mb-4 ">
        <NewDelivery />
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
        dataSource={dataDeliveries?.data}
        width="auto"
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
          {deliveriesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Search,
            Page,
            Toolbar,
            PdfExport,
            ExcelExport,
            Selection,
            Filter,
            Sort,
          ]}
        />
      </GridComponent>
    </div>
  );
};
export default Deliveries;
