import React from "react";

import DashboardRootLayout from "../layout/DashboardRootLayout";
import LandingPageRootLayout from "../layout/LandingPageRootLayout";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorMapping,
  Faq,
} from "../pages/Dashboard";
import ContactUs from "../pages/Dashboard/ContactUs";
import Home from "../pages/LandingPage/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/dashboard" element={<DashboardRootLayout />}>
        {/* home section */}
        <Route index element={<Ecommerce />} />
        <Route path="ecommerce" element={<Ecommerce />} />

        {/* pages  */}
        <Route path="orders" element={<Orders />} />
        <Route path="employees" element={<Employees />} />
        <Route path="customers" element={<Customers />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="faq" element={<Faq />} />

        {/* apps  */}
        <Route path="calendar" element={<Calendar />} />
        {/* charts  */}
        <Route path="line" element={<Line />} />
        <Route path="area" element={<Area />} />
        <Route path="bar" element={<Bar />} />
        <Route path="pie" element={<Pie />} />
        <Route path="financial" element={<Financial />} />
        <Route path="color-mapping" element={<ColorMapping />} />
        <Route path="pyramid" element={<Pyramid />} />
        <Route path="stacked" element={<Stacked />} />

        {/* page not found section */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
      <Route path="/" element={<LandingPageRootLayout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
      </Route>
    </>
  )
);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
