import React from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../../components/Dashboard";

const ContactUs = () => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg">
      <Header category="Page" title="Contact Us" />
      <Outlet />
    </div>
  );
};

export default ContactUs;
