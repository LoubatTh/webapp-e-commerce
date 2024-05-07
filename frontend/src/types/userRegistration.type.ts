export type UserRegistrationData = {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
};

export type UserRegistrationResponse = {
  token: string;
};
