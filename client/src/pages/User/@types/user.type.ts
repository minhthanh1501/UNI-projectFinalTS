type Role = "Admin || User";

export interface User {
  _id: string;
  username: string;
  password: string;
  fullname: string;
  email: string;
  unit: string;
  managerment_agent: string;
  position: string;
  phone?: string;
  address?: string;
  role: Role[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
  refreshToken?: string;
}

export type Users = Pick<
  User,
  "_id" | "username" | "fullname" | "role" | "active"
>[];

export type DataCreateUser = Omit<
  User,
  "_id" | "phone" | "address" | "Role" | "active"
>;

export type DataUpdateUser = Pick<
  User,
  | "_id"
  | "password"
  | "fullname"
  | "email"
  | "phone"
  | "address"
  | "active"
  | "position"
  | "managerment_agent"
  | "unit"
>;

export interface ParamsGetUsersProp {
  fullname: string | null;
  email: string | null;
}
