import { Users } from "../../User/@types/user.type";

export interface Group {
  _id: string;
  code: string;
  name: string;
  members: Users;
}

export type Groups = Group[];

export type DataCreateGroup = Pick<Group, "code" | "name">;

export type DataUpdateGroup = Omit<Group, "members">;
