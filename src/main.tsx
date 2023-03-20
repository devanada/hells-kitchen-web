import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import React from "react";

import store from "utils/redux/store/store";
import Routes from "routes";
import "styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <Routes />
  </Provider>
);
