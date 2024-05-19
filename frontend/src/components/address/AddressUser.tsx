import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import AddressForm from "./AddressForm";
import { fetchApiPrivate } from "@/lib/apiPrivate";
import { Address } from "@/types/user.type";
import { Button } from "../ui/button";

const fetchAddresses = async () => {
  const response = await fetchApiPrivate("GET", "user");
  const adresses: Address = response.data.address;
  console.log(adresses);
  return adresses;
};

const deleteAddress = async (addressId: string) => {
  const response = await fetchApiPrivate("DELETE", `user/address/${addressId}`);
  console.log(response);
  return response;
};

const AddressUser = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const getAddresses = async () => {
    const response = await fetchAddresses();
    setAddresses(response);
  };

  const deleteAddressHandler = async (addressId) => {
    const response = await deleteAddress(addressId);
    if (response.status === 200) {
      getAddresses();
      location.reload();
    }
  };

  useEffect(() => {
    getAddresses();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl">Address</h1>
      {addresses.map((address) => (
        <div
          key={address.id}
          className="flex flex-col h-auto w-72 bg-white border shadow-border shadow-md rounded-xl p-4 gap-2"
        >
          <p className=" text-lg">{address.name}</p>
          <div className="flex flex-col gap-1 ml-2">
            <p>
              {address.address} {address.additionnalAddress}
            </p>
            <p>
              {address.postalCode} {address.city}
            </p>
            <p>{address.country}</p>
          </div>
          <Button
            variant="destructive"
            onClick={() => deleteAddressHandler(address.id)}
          >
            Delete
          </Button>
        </div>
      ))}
      <Dialog>
        <DialogTrigger className="bg-primary p-3 text-primary-foreground">
          + Add a new address
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
    </div>
  );
};

export default AddressUser;
