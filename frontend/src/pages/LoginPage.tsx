import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/login/loginForm";

const LoginPage = () => {
  return (
    <>
      <Tabs defaultValue="account" className="w-[800px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="p-2">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register"></TabsContent>
      </Tabs>
    </>
  );
};

export default LoginPage;
