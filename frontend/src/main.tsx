import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import NavbarLayout from "./pages/NavbarLayout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Cartpage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<NavbarLayout />}>
        <Route path="" element={<HomePage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="cart" element={<Cartpage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
