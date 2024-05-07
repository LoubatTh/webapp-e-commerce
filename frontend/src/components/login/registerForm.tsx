import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/lib/form-validator/registerSchema";
import { fetchApi } from "@/lib/api";
import { UserRegistrationData } from "@/types/UserRegistration";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const register = async (
  username: string,
  password: string,
  email: string,
  firstname: string,
  lastname: string
): Promise<unknown> => {
  const response = await fetchApi<UserRegistrationData>("POST", "register", {
    username,
    password,
    email,
    firstname,
    lastname,
  });

  if (response.status !== 201) {
    console.log(response.error);
    throw new Error("An error occured");
  }

  const data = response.data;
  const token = data.token;
  Cookies.set("authToken", token);
  return true;
};

const RegisterForm = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    const ok = await register(
      values.username,
      values.password,
      values.email,
      values.firstname,
      values.lastname
    );
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
                <Input placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input placeholder="firstname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input placeholder="lastname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
