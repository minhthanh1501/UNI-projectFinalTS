import { Menu } from "@/pages/System/Group/@types/menu.type";

export interface UserInfo {
  _id: string;
  username: string;
  fullname: string;
  password: string;
  email: string;
  unit: string;
  managerment_agent: string;
  position: string;
  phone?: string;
  address?: string;
  group_id: GroupInfo;
  listMenu: MenuInfo[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
  refreshToken?: string;
}

interface GroupInfo {
  _id: string;
  code: string;
  name: string;
  menu_ids: MenuInfo[];
  createdAt: string;
  updatedAt: string;
}

interface MenuInfo {
  _id: string;
  code: string;
  name: string;
  icon: string;
  url: string;
  parent_id: string;
  children: Menu[];
  createdAt: string;
  updatedAt: string;
}
