import { Menu, Menus } from "@/pages/System/Group/@types/menu.type";
import { useLocation } from "react-router-dom";

interface TreeDataNode {
  title: string;
  key: string;
  _id: string;
  parent_id: string;
  children?: TreeDataNode[];
}

export const transformMenuToTreeData = (menus: Menus): TreeDataNode[] => {
  const transform = (menu: Menu): TreeDataNode => ({
    title: menu.name,
    key: menu.code,
    _id: menu._id,
    parent_id: menu.parent_id,
    children: menu.children ? menu.children.map(transform) : [],
  });

  return menus.map(transform);
};

export const transformMenuToDirectionTreeData = (
  menus: Menus
): TreeDataNode[] => {
  const transform = (menu: Menu): TreeDataNode => {
    const children = menu.children ? menu.children.map(transform) : [];

    return {
      title: menu.name,
      key: menu.code,
      _id: menu._id,
      parent_id: menu.parent_id,
      children: children.length > 0 ? children : undefined,
    };
  };

  return menus.map(transform);
};

export const getQueryParams = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const gid = params.get("gid");

  const uid = params.get("uid");

  const name = params.get("name");

  return {
    gid,
    uid,
    name,
  };
};
