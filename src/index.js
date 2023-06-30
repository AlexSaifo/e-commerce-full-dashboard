import React from "react";
import App from "./App";
import "./index.css";

import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";


import store from "./app/store";

import { fetchReports } from "./app/reportsSlice";
import { fetchMode } from "./app/uiSlice";

store.dispatch(fetchReports());
store.dispatch(fetchMode());

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <GoogleOAuthProvider clientId="955168227955-bc2e730kg6pf41po9lm3rrnll2l2f0dh.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
);
