import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { fetchApiPrivate } from "@/lib/apiPrivate";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store/cartStore";
import AddressUser from "@/components/address/AddressUser";

const getUserApi = async () => {
  const response = await fetchApiPrivate("GET", "user");
  return response;
};

const ProfilePage = () => {
  const { clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  const LogOut = () => {
    Cookies.remove("authToken");
    clearCart();
    navigate("/");
  };

  const getUser = async () => {
    const response = await getUserApi();
    const role = response.data.roles[0];
    if (role === "ROLE_ADMIN") {
      setIsAdmin(true);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-col gap-3 w-32">
        {isAdmin && (
          <Button onClick={() => navigate("/admin")}>Back office</Button>
        )}
        <AddressUser />
        <Button variant="destructive" onClick={LogOut}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
