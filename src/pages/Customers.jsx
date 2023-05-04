import React from "react";
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
import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";

const Customers = () => {
  let grid;
  const toolbar = ["PdfExport", "Search" , "Delete"];
  const toolbarClick = (args) => {
    if (grid && args.item.id === "grid_pdfexport") {
      grid.pdfExport();
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        id="grid"
        dataSource={customersData}
        toolbar={toolbar}
        allowPdfExport
        toolbarClick={toolbarClick}
        ref={(g) => (grid = g)}
        allowPaging
        allowSorting
        allowSelection
        editSettings={{allowDeleting:true , allowEditing:true}}
        width="auto"
      >
        <ColumnsDirective>
          {customersGrid.map((item, idx) => (
            <ColumnDirective key={idx} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[Toolbar, Selection, Search, Page, Edit, Sort ,Filter ,PdfExport]}
        />
      </GridComponent>
    </div>
  );
};

export default Customers;
