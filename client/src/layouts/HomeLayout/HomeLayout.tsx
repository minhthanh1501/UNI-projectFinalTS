import React, { ReactNode } from "react";
import Head from "../../components/Head";
import Sidebar from "../../components/Sidebar";
import { Layout } from "antd";
const { Content } = Layout;

type HomeLayoutProps = {
  children: ReactNode
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {

  return (
    <div>
      <Layout>
        <Head />
        <Layout>
          <Sidebar />
          <Content style={{ marginLeft: 200 }}>{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default HomeLayout;
