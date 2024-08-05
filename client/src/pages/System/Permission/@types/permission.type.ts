export interface Menu {
  _id: string;
  code: string;
  name: string;
  menuType: string;
  expression: string;
  icon: string;
  url: string;
  parent_id: string;
  permission: string;
  order: number;
  mobile: string;
  note: string;
}

export type Menus = Menu[];

export type DataCreateMenu = Omit<Menu, "code" | "_id">;

export type DataUpdateMenu = Omit<Menu, "code">;
