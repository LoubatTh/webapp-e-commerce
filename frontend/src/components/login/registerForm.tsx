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
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import type {
  UserRegistrationData,
  UserRegistrationResponse,
} from "@/types/userRegistration.type";
import { useToast } from "../ui/use-toast";

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

  if (response.status === 201) {
    const data = response.data as UserRegistrationResponse;
    const token = data.token;
    Cookies.set("authToken", token);
    return response;
  }
  return response;
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

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
    const response = await register(
      values.username,
      values.password,
      values.email,
      values.firstname,
      values.lastname
    );
    if (!response.error) {
      navigate("/");
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: response.error,
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
