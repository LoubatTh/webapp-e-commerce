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
import { UserLoginData } from "@/types/UserLogin";
import { useNavigate } from "react-router-dom";

const login = async (username: string, password: string): Promise<unknown> => {
  const response = await fetchApi<UserLoginData>("POST", "login", {
    username,
    password,
  });

  if (response.status !== 200) {
    console.log(response.error);
    throw new Error("An error occured");
  }

  const data = response.data;
  const token = data.token;
  Cookies.set("authToken", token);
  return true;
};

const LoginForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const ok = await login(values.username, values.password);
    if (ok) {
      navigate("/");
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
