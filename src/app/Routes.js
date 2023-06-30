import React from "react";

import DashboardRootLayout from "../layout/DashboardRootLayout";
import LandingPageRootLayout from "../layout/LandingPageRootLayout";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
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
} from "../pages/Dashboard";
import ContactUs from "../pages/Dashboard/ContactUs";
import Home from "../pages/LandingPage/Home";
import AuthPage from "../pages/LandingPage/AuthPage";
import ContactUsLanding from "../pages/LandingPage/ContactUsLanding";
import AboutUs from "../pages/LandingPage/AboutUs";
import Reports from "../pages/Dashboard/Reports";
import Profile from "../pages/Dashboard/Profile";
import Stores from "../pages/Dashboard/Stores";
import {
  MultiStores,
  MultiReports,
  MultiContactUs,
  Contact,
  Report,
  AddNewStore,
} from "../components/Dashboard";
import { orderLoader } from "../pages/Dashboard/Orders";
import { employeeLoader } from "../pages/Dashboard/Employees";
import { customersLoader } from "../pages/Dashboard/Customers";
import { storesLoader } from "../components/Dashboard/MultiStores";
import { contactLoader } from "../components/Dashboard/MultiContactUs";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/dashboard" element={<DashboardRootLayout />}>
        {/* home section */}
        <Route index element={<Ecommerce />} />
        <Route path="ecommerce" element={<Ecommerce />} />
        <Route path="profile" element={<Profile />} />

        {/* pages  */}
        <Route path="orders" element={<Orders />} loader={orderLoader}/>
        <Route path="employees" element={<Employees />} loader={employeeLoader} />
        <Route path="customers" element={<Customers />} loader={customersLoader} />

        <Route path="stores" element={<Stores />}  >
          <Route index element={<MultiStores />} loader={storesLoader} />
          <Route path="add" element={<AddNewStore />} />
        </Route>

        <Route path="contact-us" element={<ContactUs />}>
          <Route index element={<MultiContactUs />} loader={contactLoader} />
          <Route path=":id" element={<Contact />} />
        </Route>

        <Route path="reports" element={<Reports />}>
          <Route index element={<MultiReports />} />
          <Route path=":id" element={<Report />} />
        </Route>

        
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
        <Route path="auth" element={<AuthPage />} />
        <Route path="contact" element={<ContactUsLanding />} />
        <Route path="about" element={<AboutUs />} />

        {/* <Route path="register" element={<AuthPage title="Register"/>} />
        <Route path="forgot-password" element={<AuthPage title="Forgot Password"/>} />
        <Route path="register" element={<AuthPage title="Register"/>} /> */}
      </Route>
    </>
  )
);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
