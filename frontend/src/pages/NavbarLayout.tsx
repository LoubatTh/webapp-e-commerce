import Navbar from "@/components/navbar";
import { Outlet } from "react-router";

const NavbarLayout = () => {
  return (
    <>
      <div className="h-10">
        <Navbar />
      </div>
      <Outlet />
    </>
  );
};

export default NavbarLayout;
