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
import LoginPage from "./pages/LoginPage";
import Homepage from "./pages/Homepage";
import Payment from "./pages/Payment";
import OfficeProduct from "./pages/OfficeProduct";
import OfficeNewProduct from "./pages/OfficeNewProduct";
import AddressSelection from "./pages/AddressSelection";
import { Toaster } from "@/components/ui/toaster";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<NavbarLayout />}>
        <Route path="" element={<Homepage />} />
        <Route path="admin" element={<OfficeProduct />} />
        <Route path="add-product" element={<OfficeNewProduct />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="cart" />
        <Route path="address" element={<AddressSelection />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/address" element={<AddressSelection />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster />
  </React.StrictMode>
);
