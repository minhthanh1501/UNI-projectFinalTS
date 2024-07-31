export interface Menu {
  _id: string;
  code: string;
  name: string;
  icon: string;
  url: string;
  parent_id: string;
  permission_ids: [];
  order: number;
}

export type Menus = Menu[];

export type DataCreateMenu = Omit<Menu, "code" | "permission_ids">;

export type DataUpdateMenu = Omit<Menu, "code">;
