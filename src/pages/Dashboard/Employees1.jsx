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
  Selection,
  Filter,
  Sort,
} from "@syncfusion/ej2-react-grids";
import { employeesGrid } from "../data/dummy";
import { Header } from "../components";
import { useSelector } from "react-redux";
import { selectAllEmployees } from "../app/employeesSlice";




const Employees = () => {
  const employeesData = useSelector(selectAllEmployees);

  let grid;
  const toolbar = ['Add', 'Delete','Cancel' , 'PdfExport'];
  
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
        allowSelection
        width="auto"
        editSettings={{ allowDeleting: true , allowAdding:true }}
      >
        <ColumnsDirective>
          {employeesGrid.map((item, idx) => (
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
    </div>
  );
};

export default Employees;
