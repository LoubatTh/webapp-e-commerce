import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const LogOut = () => {
    Cookies.remove("authToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const token = Cookies.get("authToken");
    const userIsLoggedIn = !!token;
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  if (isLoggedIn) {
    return (
      <div>
        <Button onClick={LogOut}>Logout</Button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Profile</h1>
        <p>You are not logged in</p>
      </div>
    );
  }
};

export default ProfilePage;
