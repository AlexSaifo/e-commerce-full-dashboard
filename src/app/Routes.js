import React from "react";

import DashboardRootLayout from "../layout/DashboardRootLayout";
import LandingPageRootLayout from "../layout/LandingPageRootLayout";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
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
import { useSelector } from "react-redux";
import NotFound from "../pages/Not-Found";
import AuthPage from "../pages/LandingPage/auth/AuthLayout";
import Login from "../pages/LandingPage/auth/Login";
import ForgetPassword from "../pages/LandingPage/auth/ForgetPassword";
import NewPassword from "../pages/LandingPage/auth/NewPassword";
import Store from "../components/Dashboard/Store";
import Categories from "../pages/Dashboard/Categories";

const Routes = () => {
  const {user , resetPassword} = useSelector((state) => state.auth);


  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {user && (
          <Route
            path="/auth"
            element={<Navigate to="/dashboard/ecommerce" />}
          />
        )}
        {user && (
          <Route path="/dashboard" element={<DashboardRootLayout />}>
            {/* home section */}
            <Route index element={<Ecommerce />} />
            <Route path="ecommerce" element={<Ecommerce />} />
            <Route path="profile" element={<Profile />} />

            {/* pages  */}
            <Route path="orders" element={<Orders />} loader={orderLoader} />
            <Route
              path="employees"
              element={<Employees />}
            />
            <Route
              path="customers"
              element={<Customers />}
              loader={customersLoader}
            />

            <Route path="stores" element={<Stores />}>
              <Route index element={<MultiStores />} />
              <Route path="add" element={<AddNewStore />} />
              <Route path=":storeId/show" element={<Store />} />
            </Route>
            

            <Route path="contact-us" element={<ContactUs />}>
              <Route
                index
                element={<MultiContactUs />}
                loader={contactLoader}
              />
              <Route path=":id" element={<Contact />} />
            </Route>

            <Route path="reports" element={<Reports />}>
              <Route index element={<MultiReports />} />
              <Route path=":id" element={<Report />} />
            </Route>

            {/* apps  */}
            <Route path="calendar" element={<Calendar />} />
            <Route path="categories" element={<Categories />} />
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
            <Route path="not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        )}
        <Route path="/" element={<LandingPageRootLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<ContactUsLanding />} />
          <Route path="about" element={<AboutUs />} />
          {!user && (
            <Route path="/auth" element={<AuthPage />}>
              <Route index element={<Login />} />
              <Route path="forget-password" element={<ForgetPassword />} />
              {true && <Route path="new-password" element={<NewPassword />} />}
            </Route>
          )}
          {!user && <Route path="*" element={<Navigate to="/auth" />} />}
          {user && <Route path="*" element={<NotFound />} />}

          {/* <Route path="register" element={<AuthPage title="Register"/>} />
          <Route path="forgot-password" element={<AuthPage title="Forgot Password"/>} />
          <Route path="register" element={<AuthPage title="Register"/>} /> */}
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default Routes;
