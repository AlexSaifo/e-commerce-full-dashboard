import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  Toolbar,
  PdfExport,
  Edit,
  Inject,
  ExcelExport,
} from "@syncfusion/ej2-react-grids";
import { ordersGrid } from "../../data/dummy";
import { Header } from "../../components/Dashboard";

import { useSelector } from "react-redux";
import store from "../../app/store";
import DataSpinner from "../../components/DataSpinner";
import { useFetchOrdersQuery } from "../../app/api/ordersApi";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { MdDeleteOutline } from "react-icons/md";

import ChangeDelivery from '../../components/Dashboard/ChangeDelivery'
import { Box } from "@mui/material";

const Orders = () => {
  const [ordersData, setOrdersData] = useState([]);

  const {
    data: allOrdersData,
    isSuccess: orderIsSuccess,
    isLoading: orderIsLoading,
    isError: orderIsError,
    error: orderError,
  } = useFetchOrdersQuery();

  useEffect(() => {
    if (orderIsSuccess) {
      setOrdersData(allOrdersData?.data);
    }
  }, [orderIsSuccess]);

  const showSpinner = ordersData.length === 0;

  const DeleteButton = () => (
    <button className="e-tbar-btn mr-1 flex items-center">
      <MdDeleteOutline className="w-5 h-5 m-2" />
      <span>Cancle</span>
    </button>
  );
  const gridRef = useRef(null);

  const toolbarOptions = [
    { id: "Delete", template: DeleteButton },
    "PdfExport",
    "ExcelExport",
  ];
  const toolbarClick = async (args) => {
    console.log(args.item, gridRef.current);
    if (gridRef.current && args.item.id?.includes("pdfexport")) {
      gridRef?.current?.pdfExport();
    } else if (gridRef.current && args.item.id.includes("excelexport")) {
      gridRef.current.excelExport();
    } else if (
      // strat delete
      gridRef.current?.getSelectedRecords()[0] &&
      args?.item?.id?.includes("Delete")
    ) {
      console.log(gridRef.current?.getSelectedRecords());
      const selectedRecords = gridRef.current?.getSelectedRecords();
      //const response = await deleteItem(selectedRecords[0]?.item_id);
      // end delete
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg">
      <Header category="Inner Pages" title="Orders" />
      <DataSpinner showSpinner={showSpinner} />

      <Box sx={{width:'100%' , display:'flex' , justifyContent:'end' , margin:'1rem 0'}}>
        <ChangeDelivery />
      </Box>

      {!showSpinner && (
        <GridComponent
          ref={gridRef}
          id="grid"
          dataSource={ordersData}
          toolbar={toolbarOptions}
          allowPdfExport={true}
          allowExcelExport={true}
          toolbarClick={toolbarClick}
          allowPaging={true}
          allowSorting={true}
          allowFiltering={true}
          allowResizing={true}
          editSettings={{ allowDeleting: true }}
        >
          <ColumnsDirective>
            {ordersGrid.map((item, idx) => (
              <ColumnDirective key={idx} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[
              Resize,
              Toolbar,
              Sort,
              ContextMenu,
              Filter,
              Page,
              Edit,
              PdfExport,
              ExcelExport,
            ]}
          />
        </GridComponent>
      )}
    </div>
  );
};

export default Orders;
