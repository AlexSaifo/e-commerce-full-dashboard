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
} from "@syncfusion/ej2-react-grids";
import { ordersGrid } from "../../data/dummy";
import { Header } from "../../components/Dashboard";

import { useSelector } from "react-redux";
import { fetchOrders, selectAllOrders } from "../../app/ordersSlice";
import store from "../../app/store";
import DataSpinner from "../../components/DataSpinner";

const Orders = () => {
  const ordersData = useSelector(selectAllOrders);
  const showSpinner = ordersData.length === 0;

  let grid;
  const toolbar = ["PdfExport"];
  const toolbarClick = (args) => {
    if (grid && args.item.id === "grid_pdfexport") {
      grid.pdfExport();
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg">
      <Header category="Page" title="Orders" />
      <DataSpinner showSpinner={showSpinner} />

      {!showSpinner && (
        <GridComponent
          id="grid"
          dataSource={ordersData}
          toolbar={toolbar}
          allowPdfExport={true}
          toolbarClick={toolbarClick}
          ref={(g) => (grid = g)}
          allowPaging={true}
          allowSorting={true}
          allowFiltering={true}
          allowResizing={true}
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
            ]}
          />
        </GridComponent>
      )}
    </div>
  );
};

export default Orders;

export const orderLoader = async () => {
  try {
    setTimeout(() => {
      store.dispatch(fetchOrders());
    }, 1500);
    return true;
  } catch (error) {
    throw Error("Could not find that Career !");
  }
};

// export const careerDetailsLoader = async ({ params }) => {
//   try {
//     const response = await fetch(`http://localhost:3500/careers/${params.id}`);
//     if (!response.ok) {
//       throw Error("Could not find that Career !");
//     }
//     const data = response.json();
//     return data;
//   } catch (error) {
//     throw Error("Could not find that Career !");
//   }
// };
