import React, { useContext, useEffect, useState } from "react";
import {
  CaretRightOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "@/contexts/app.context";

const { Sider } = Layout;

export type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  onClick?: () => void
): MenuItem {
  return {
    key,
    icon: icon || <CaretRightOutlined />,
    children,
    label,
    onClick,
  } as MenuItem;
}


const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarItems, setSidebarItems] = useState<MenuItem[]>([])

  const navigate = useNavigate()
  const { userInfo } = useContext(AppContext)

  useEffect(() => {
    if (userInfo !== null) {
      const menus = userInfo.listMenu

      // const newSidebarItems = menus.map(menu => {
      //   const children = menu.children?.map(child => {
      //     return getItem(child.name, child.code, undefined, undefined, () => navigate(`${child.url}`));
      //   });
      //   // console.log(children);
      //   return getItem(menu.name, menu.code, undefined, children);
      // });
      // setSidebarItems(newSidebarItems)

      const sidebarItemsRecursive = (menus: any[], navigate: Function): any[] => {
        const arr = [];

        for (let i = 0; i < menus.length; i++) {
          const menu = menus[i];
          // Nếu menu có children, gọi đệ quy cho children
          const children = menu.children && menu.children.length > 0
            ? sidebarItemsRecursive(menu.children, navigate)
            : [];

          // Tạo item cho menu hiện tại
          arr.push(getItem(
            menu.name,
            menu.code,
            menu.icon,
            children,
            menu.children.length === 0 ? () => navigate(menu.url) : undefined
          ));
        }

        return arr;
      };

      let array = sidebarItemsRecursive(menus, navigate);
      setSidebarItems(array)
      console.log("array:", array)

      // const sidebarItemsMenu = (menus: any, parent_id: any): any => {
      //   const arr = [];

      //   for (let i = 0; i < menus.length; i++) {
      //     if (menus[i].parrent_id == parent_id) {
      //       let menuItem = menus[i]

      //       arr.push({
      //         title: menuItem.name,
      //         key: menuItem.code,
      //         icon: menuItem.icon,
      //         children: sidebarItemsMenu(menus, menuItem._id)
      //       })

      //     }
      //   }
      //   return arr
      // }
      // let array = sidebarItemsMenu(menus, null);
      // console.log(array)
    }
  }, [userInfo])

  console.log(userInfo);

  const location = useLocation()
  const pathname = location.pathname;
  const pathSegments = pathname.split('/').filter(segment => segment);
  const lastSegment = pathSegments[pathSegments.length - 1];

  const defaultSelectK = (() => {
    switch (lastSegment) {
      case "nguoidung":
        return '2';
      case "nhomnguoidung":
        return '3';
      case "quyen":
        return "4"
      default:
        return '1';
    }
  })();

  const items: MenuItem[] = [
    getItem('Hệ thống', '1', <PieChartOutlined />, [
      getItem('Người dùng', '2', <CaretRightOutlined />, undefined, () => navigate("/danhmuc/nguoidung")),
      getItem('Nhóm người dùng', '3', <CaretRightOutlined />, undefined, () => navigate("/danhmuc/nhomnguoidung")),
      getItem('Quyền', '4', <CaretRightOutlined />, undefined, () => navigate("/danhmuc/quyen")),
    ]),

  ];

  return (
    <Sider
      style={{
        minHeight: "100vh",
        overflow: "auto",
        position: "fixed",
        zIndex: 1,
        left: 0,
        top: 64,
        bottom: 0,
      }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="bg-primary"
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={[defaultSelectK]}
        mode="inline"
        style={{
          backgroundColor: "#141414",
        }}
        items={sidebarItems}

      >
      </Menu>
    </Sider>
  );
};

export default Sidebar;
