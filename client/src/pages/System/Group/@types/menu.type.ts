interface TreeDataNode {
  title: string;
  key: string;
  _id: string;
  children?: TreeDataNode[];
}

export interface Menu {
  _id: string;
  code: string;
  name: string;
  icon: string;
  url: string;
  parent_id: string;
  permission_ids: string[];
  order: number;
  children: Menu[];
}

export type Menus = Menu[];

export type DataCreateMenu = Omit<Menu, "_id" | "code" | "permission_ids">;

export type DataUpdateMenu = Omit<Menu, "code">;
