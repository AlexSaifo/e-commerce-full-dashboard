import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import {
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings,
} from "../components/Dashboard";

import "../App.css";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setCurrentColor,
  setCurrentMode,
  setThemeSettings,
} from "../app/uiSlice";
import { Box } from "@mui/material";

const DashboardRootLayout = () => {
  const { currentMode, activeMenu, currentColor, themeSettings } = useSelector(
    (state) => state.ui
  );

  const dispatch = useDispatch();

  // const [increment , setIncrement] = useState();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      dispatch(setCurrentColor(currentThemeColor));
      dispatch(setCurrentMode(currentThemeMode));
    }
  }, [dispatch]);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => dispatch(setThemeSettings(true))}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
 
        <Box sx={{display:'flex' , justifyContent:'flex-start' , width:'100%'}}>
          {activeMenu ? (
            <div className="w-72  sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen  w-[80%]  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 ml-0"
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}

              <Outlet />
            </div>
            <Footer />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default DashboardRootLayout;
