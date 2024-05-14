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
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const getUserAddresses = async (): Promise<Address[]> => {
  const response = await fetchApiPrivate("GET", "user");
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Select your address</FormLabel>
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
        <Button type="submit">Select address</Button>
      </form>
    </Form>
  );
};

export default AddressSelector;
