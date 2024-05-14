import NewProduct from "@/components/admin/NewProduct";
import { isAuthenticated } from "@/lib/auth/checkUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OfficeNewProduct = () => {
  const navigate = useNavigate();
  const checkUser = () => {
    if (!isAuthenticated()) {
      console.log("User not authenticated");
      navigate("/login");
    }
  };

  useEffect(() => {
    checkUser();
  });

  return (
    <div className="flex flex-col p-5 gap-5">
      <div className=" text-center text-3xl">
        <h1 className="uppercase">New product</h1>
      </div>
      <div>
        <NewProduct />
      </div>
    </div>
  );
};

export default OfficeNewProduct;
