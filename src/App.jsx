import React from "react";

// routes
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store";
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
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyles />
        <ToastContainer autoClose={3000} className="toast-container" />
      </Router>
    </Provider>
  );
}
