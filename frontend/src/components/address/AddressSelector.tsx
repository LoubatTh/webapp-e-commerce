import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { fetchApiPrivate } from "@/lib/apiPrivate";
import { useEffect, useState } from "react";
import { Address, User } from "@/types/user.type";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
  FormLabel,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const getUserAddresses = async (): Promise<Address[]> => {
  const response = await fetchApiPrivate("GET", "user");
  console.log(response);
  const data = response.data as User;
  const addresses: Address[] = data.address as Address[];
  return addresses;
};

const postOrderAdress = async (addressId: number) => {
  const response = await fetchApiPrivate("POST", "carts/validate", {
    address: addressId,
  });
  return response;
};

const AddressSelector = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const FormSchema = z.object({
    type: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const fetchAddresses = async () => {
    const response = await getUserAddresses();
    setAddresses(response);
  };

  const postAddress = async (addressId: number) => {
    const response = await postOrderAdress(addressId);
    console.log(response);
    return response;
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const idAddress = parseInt(data.type);
    postAddress(idAddress);
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="w-full text-center">
      {addresses.length === 0 ? (
        <div>No address found</div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="uppercase w-full text-center text-lg">
                    Select an address
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={address.id.toString()}
                            id={address.id.toString()}
                          />
                          <Label htmlFor={address.id.toString()}>
                            <div className="flex flex-col">
                              <div>{address.name}</div>
                              <div>
                                {address.address} {address.additionnalAdress}
                              </div>
                              <div>
                                {address.postalCode} {address.city}
                              </div>
                              <div>{address.country}</div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Payment
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default AddressSelector;
