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
import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import { Header } from "../components";

const Orders = () => {
  let grid;
  const toolbar = ["PdfExport"];
  const toolbarClick = (args) => {
    if (grid && args.item.id === "grid_pdfexport") {
      grid.pdfExport();
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
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
    </div>
  );
};

export default Orders;
