type Role = "Admin || User";

export interface User {
  _id: string;
  username: string;
  password: string;
  fullname: string;
  email: string;
  phone?: string;
  address?: string;
  role: Role[];
  actived: string;
  createdAt: string;
  updatedAt: string;
  refreshToken?: string;
}

export type Users = Pick<
  User,
  "_id" | "username" | "fullname" | "role" | "actived"
>[];

export type DataCreateUser = Omit<
  User,
  | "_id"
  | "phone"
  | "address"
  | "Role"
  | "actived"
  | "createdAt"
  | "updatedAt"
  | "refreshToken"
>;

export type DataUpdateUser = Pick<
  User,
  "password" | "fullname" | "email" | "phone" | "address"
>;
