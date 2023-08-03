import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {  Header } from "../../components/Dashboard";
import { useSelector } from "react-redux";
import { AiOutlineBackward } from "react-icons/ai";
import { Button } from "@mui/material";
const Stores = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentColor } = useSelector((state) => state.ui);
  // Get the current URL path
  const currentPath = location.pathname;

  const isShow = currentPath.includes("show") || currentPath.includes("add")

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10  dark:bg-secondary-dark-bg bg-white rounded-3xl ">
      <Header category="Page" title="Stores" />
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
export default Stores;
