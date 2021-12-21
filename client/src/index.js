import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';

// MUI
import { StylesProvider } from "@material-ui/core";

// React Query
import { QueryClient, QueryClientProvider } from "react-query";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

// Context
import ContextProvider from "./context/Context.provider";

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst={true}>
      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <ContextProvider>
            <App />
          </ContextProvider>
        </Provider>
      </QueryClientProvider>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
