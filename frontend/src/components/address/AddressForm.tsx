import { addressSchema } from "@/lib/form-validator/addressSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { fetchApiPrivate } from "@/lib/apiPrivate";

const addNewAddress = async (
  name: string,
  address: string,
  additionnalAdress: string,
  postalCode: string,
  city: string,
  country: string
) => {
  const response = await fetchApiPrivate("POST", "user/address", {
    name: name,
    address: address,
    additionnalAdress: additionnalAdress,
    postalCode: postalCode,
    city: city,
    country: country,
  });
  return response;
};

const AddressForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof addressSchema>>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      address: "",
      additionnalAdress: "",
      postalCode: "",
      city: "",
      country: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addressSchema>) {
    const ok = await addNewAddress(
      values.name,
      values.address,
      values.additionnalAdress,
      values.postalCode,
      values.city,
      values.country
    );
    if (ok) {
      navigate("/address");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="additionnalAdress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additionnal infos</FormLabel>
              <FormControl>
                <Input placeholder="additionnalAdress" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal code</FormLabel>
              <FormControl>
                <Input placeholder="postalCode" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="city" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add new address</Button>
      </form>
    </Form>
  );
};

export default AddressForm;
