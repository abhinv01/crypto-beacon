import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Crypto from "./pages/Crypto";
import Trending from "./pages/Trending";
import SavedCoin from "./pages/SavedCoin";
// import Extra from "./pages/Extra";
import Loader from "./components/Loader";
import CryptoModal from "./components/CryptoModal";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: Loader,
    children: [
      {
        path: "/",
        element: <Crypto />,
        loader: Loader,
        children: [
          {
            path: ":coindId",
            element: <CryptoModal />,
          },
        ],
      },
      {
        path: "trending",
        element: <Trending />,
        loader: Loader,
        children: [
          {
            path: ":coindId",
            element: <CryptoModal />,
          },
        ],
      },
      {
        path: "savedcoin",
        element: <SavedCoin />,
        loader: Loader,
        children: [
          {
            path: ":coindId",
            element: <CryptoModal />,
          },
        ],
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
