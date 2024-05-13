import { newProductSchema } from "@/lib/form-validator/newProduct";
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

const addNewProduct = async (
  name: string,
  description: string,
  price: number
) => {
  const response = await fetchApiPrivate("POST", "products", {
    name: name,
    description: description,
    photo: "https://unsplash.it/400",
    type: "Shirt",
    size: ["XS", "S", "M", "L", "XL", "XXL"],
    gender: "Men",
    color: "Blue",
    brand: "Nike",
    price: price,
  });
  return response;
};

const NewProduct = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof newProductSchema>>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof newProductSchema>) {
    const ok = await addNewProduct(
      values.name,
      values.description,
      values.price
    );
    console.log(ok);
    if (ok) {
      navigate("/admin");
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="price"
                  type="number"
                  step={0.01}
                  min={0.5}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register new product</Button>
      </form>
    </Form>
  );
};

export default NewProduct;
