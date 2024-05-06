import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/login/loginForm";
import RegisterForm from "@/components/login/registerForm";

const LoginPage = () => {
  return (
    <div className="h-screen flex flex-col justify-between items-center">
      <div className="h-2/5">
        <img src="/logo.png" alt="Companie logo" className="h-full" />
      </div>
      <div className="h-3/5">
        <Tabs defaultValue="connect" className="w-[800px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="connect">Connect</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="connect" className="p-2">
            <LoginForm />
          </TabsContent>
          <TabsContent value="register" className="p-2">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
