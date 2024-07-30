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
  group_id: { _id: string };
  active: boolean;
  createdAt: string;
  updatedAt: string;
  refreshToken?: string;
}

export type Users = Pick<
  User,
  "_id" | "username" | "fullname" | "group_id" | "email"
>[];

export type DataCreateUser = Omit<
  User,
  "_id" | "phone" | "address" | "group_id" | "active"
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
  fullname?: string;
  email?: string;
  gid?: string;
}
