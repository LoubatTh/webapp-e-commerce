import { Button } from "@/components/ui/button";

const apiRegister = async (username: string, password: string) => {
  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const data = await response.json();
  console.log(data);
};

const apiLogin = async (username: string, password: string) => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const data = await response.json();
  console.log(data);
};
const LoginPage = () => {
  const username = "matteo";
  const password = "matteoPassword";

  const register = async () => {
    apiRegister(username, password);
  };

  const login = async () => {
    apiLogin(username, password);
  };

  return (
    <>
      <h1>auth</h1>
      <div>
        <Button onClick={register}>Register</Button>
      </div>
      <div>
        <Button onClick={login}>Login</Button>
      </div>
    </>
  );
};

export default LoginPage;
