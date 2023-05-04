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
} from "@syncfusion/ej2-react-grids";
import { employeesData, employeesGrid } from "../data/dummy";
import { Header } from "../components";

const Employees = () => {
  let grid;
  const toolbar = ["PdfExport" , "Search"];
  const toolbarClick = (args) => {
    if (grid && args.item.id === "grid_pdfexport") {
      grid.pdfExport();
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Employees" />
      <GridComponent
        id="grid"
        dataSource={employeesData}
        toolbar={toolbar}
        allowPdfExport
        toolbarClick={toolbarClick}
        ref={(g) => (grid = g)}
        allowPaging
        allowSorting
        width="auto"
      >
        <ColumnsDirective>
          {employeesGrid.map((item, idx) => (
            <ColumnDirective key={idx} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Toolbar,Search, Page, Edit, PdfExport]} />
      </GridComponent>
    </div>
  );
};

export default Employees;
