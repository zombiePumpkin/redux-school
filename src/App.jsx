import React from "react";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

// routes
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./store/index";

import Routes from "./routes";

// components
import Header from "./components/Header";

// services
import history from "./services/history";

// assets
import GlobalStyles from "./styles/GlobalStyles";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Header />
          <Routes />
          <GlobalStyles />
          <ToastContainer autoClose={3000} className="toast-container" />
        </Router>
      </PersistGate>
    </Provider>
  );
}
