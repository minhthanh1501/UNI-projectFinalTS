import React, { useState } from "react";
import {
  CaretRightOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, } from 'antd';
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  onClick?: () => void
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  } as MenuItem;
}


const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()

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
        defaultSelectedKeys={["1"]}
        mode="inline"
        style={{
          backgroundColor: "#141414",
        }}
        items={items}
      >
      </Menu>
    </Sider>
  );
};

export default Sidebar;
