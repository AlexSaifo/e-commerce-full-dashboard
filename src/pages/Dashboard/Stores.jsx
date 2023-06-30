import React from "react";




import { Outlet } from "react-router-dom";
import { Header } from "../../components/Dashboard";
const Stores = () => {

  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 dark:bg-secondary-dark-bg bg-white rounded-3xl ">
      <Header category="Page" title="Stores" />
      <Outlet/>
    </div>
  );
};
export default Stores;


