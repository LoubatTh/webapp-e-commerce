import AddressForm from "@/components/address/AddressForm";
import AddressSelector from "@/components/address/AddressSelector";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isAuthenticated } from "@/lib/auth/checkUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddressSelection = () => {
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
    <div className="flex flex-col gap-5 p-5 w-64 mx-auto justify-center">
      <Dialog>
        <DialogTrigger>
          <Button className="w-full">+ Add a new address</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose a new address</DialogTitle>
            <DialogDescription>
              <AddressForm />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <AddressSelector />
    </div>
  );
};

export default AddressSelection;
