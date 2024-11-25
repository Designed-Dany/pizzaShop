import { NuqsAdapter } from "nuqs/adapters/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      {" "}
      <NuqsAdapter>
        {" "}
        <App />
      </NuqsAdapter>
    </Provider>
  </BrowserRouter>
);
