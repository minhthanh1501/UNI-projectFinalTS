import React, { ReactNode, useContext } from "react";
import Head from "../../components/Head";
import Sidebar from "../../components/Sidebar";
import { Layout } from "antd";
import { AppContext } from "@/contexts/app.context";
const { Content } = Layout;

type HomeLayoutProps = {
  children: ReactNode
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const { userInfo } = useContext(AppContext)
  console.log(userInfo);


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
