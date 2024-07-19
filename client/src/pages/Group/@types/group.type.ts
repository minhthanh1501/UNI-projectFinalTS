import { Users } from "@/pages/User/@types/user.type";

export interface Group {
  _id: string;
  code: string;
  name: string;
  members: Users;
}

export type Groups = Group[];

export type CreateDataGroup = Pick<Group, "code" | "name">;

export type UpdateDataGroup = Omit<Group, "members">;
