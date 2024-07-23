import React, { useState } from "react";
import {
  CaretRightOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, } from 'antd';
import { useLocation, useNavigate } from "react-router-dom";

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
        items={items}
      >
      </Menu>
    </Sider>
  );
};

export default Sidebar;
