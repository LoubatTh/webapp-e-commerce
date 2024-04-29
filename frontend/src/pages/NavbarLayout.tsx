import Navbar from "@/components/navbar";
import { Outlet } from "react-router";

const NavbarLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default NavbarLayout;
