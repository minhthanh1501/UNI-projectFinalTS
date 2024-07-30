export interface Group {
  _id: string;
  code: string;
  name: string;
  menu_ids: string[];
}

export type Groups = Group[];

export type DataCreateGroup = Pick<Group, "code" | "name">;

export type DataUpdateGroup = Omit<Group, "menu_ids">;
