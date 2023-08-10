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
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { AiOutlineBackward } from "react-icons/ai";

const Items = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentColor } = useSelector((state) => state.ui);
  // Get the current URL path
  const currentPath = location.pathname;

  const isShow = currentPath.includes("show") || currentPath.includes("add");

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg">
      <Header category="Inner Pages" title="Items" />

      {isShow && (
        <Button
          variant="contained"
          sx={{
            backgroundColor: currentColor,
            color: "white",
            "&:hover": {
              backgroundColor: "light-gray",
            },
            alignSelf: "flex-start",
            margin: "0 0 1.5rem 0",
            "& .MuiSvgIcon-root": {
              fontSize: "1.2rem",
            },
          }}
          onClick={() => {
            navigate(-1);
          }}
          disabled={false}
          startIcon={<AiOutlineBackward />}
        >
          Back
        </Button>
      )}
      <Outlet />
    </div>
  );
};

export default Items;
