export type User = {
  id: number;
  username: string;
  roles: Role[];
  email: string;
  firstname: string;
  lastname: string;
  address: Address[];
};

export type Address = {
  id: number;
  name: string;
  address: string;
  additionnalAdress: string;
  postalCode: string;
  city: string;
  country: string;
};

enum Role {
  ADMIN = "ROLE_ADMIN",
  USER = "ROLE_USER",
}
