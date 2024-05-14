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
import ProfilePage from "./pages/ProfilePage";
import Cartpage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import Payment from "./pages/Payment";
import OfficeProduct from "./pages/OfficeProduct";
import OfficeNewProduct from "./pages/OfficeNewProduct";
import AddressSelection from "./pages/AddressSelection";
import Cookies from "js-cookie";

const getAccessToken = () => {
  return Cookies.get("authToken");
};

const isAuthenticated = () => {
  return !!getAccessToken();
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<NavbarLayout />}>
        <Route path="" element={<Homepage />} />
        <Route
          path="admin"
          element={isAuthenticated() ? <OfficeProduct /> : <Homepage />}
        />
        <Route
          path="add-product"
          element={isAuthenticated() ? <OfficeNewProduct /> : <Homepage />}
        />
        <Route
          path="profile"
          element={isAuthenticated() ? <ProfilePage /> : <Homepage />}
        />
        <Route
          path="cart"
          element={isAuthenticated() ? <Cartpage /> : <Homepage />}
        />
        <Route
          path="address"
          element={isAuthenticated() ? <AddressSelection /> : <Homepage />}
        />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/payment"
        element={isAuthenticated() ? <Payment /> : <Homepage />}
      />
      <Route path="/address" element={isAuthenticated() ?<AddressSelection />}: <Homepage />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
