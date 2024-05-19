import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetchApi } from "@/lib/api";
import Cookies from "js-cookie";
import { loginSchema } from "@/lib/form-validator/loginSchema";
import { useNavigate } from "react-router-dom";
import type { UserLoginData, UserLoginResponse } from "@/types/userLogin.type";
import { useToast } from "../ui/use-toast";
import { useCartStore } from "@/lib/store/cartStore";
import { fetchApiPrivate } from "@/lib/apiPrivate";

const login = async (username: string, password: string): Promise<unknown> => {
  const response = await fetchApi<UserLoginData>("POST", "login", {
    username,
    password,
  });

  if (response.status === 200) {
    const data = response.data as UserLoginResponse;
    const token = data.token;
    Cookies.set("authToken", token);
    return "success";
  }
  return response;
};

const getCarts = async () => {
  const response = await fetchApiPrivate("GET", "carts");
  console.log(response);
  return response;
};

const LoginForm = () => {
  const { addItem } = useCartStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const response = await login(values.username, values.password);
    if (response === "success") {
      const carts = await getCarts();
      const items = carts.data.products;
      items.forEach((item) => {
        addItem(item);
      });
      navigate("/");
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: response.message,
        duration: 3000,
      });
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passsword</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Connect</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
