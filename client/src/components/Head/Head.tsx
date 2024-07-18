import { Button, Layout } from "antd";
import logo from "../..//assets/images/quochuy.png";
import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";
const { Header } = Layout;

const Head = () => {
  return (
    <Header
      className="bg-primary"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        width: "100%",
        boxShadow: "0px 3px 5px 1px rgba(0, 0, 0,0.8 )",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="w-[30%] flex gap-3">
          <img src={logo} alt="LOGO" className="w-10 object-contain" />
          <h1 className="text-white">CƠ SỞ DỮ LIỆU CHUYÊN NGÀNH</h1>
        </div>
        <div className="flex gap-5">
          <Button
            className="text-white text-[16px] bg-transparent rounded-3xl border-none hover:opacity-75"
            shape="circle"
          >
            <QuestionCircleOutlined />
          </Button>
          <Button
            className="text-white text-[16px] bg-transparent rounded-3xl border-none hover:opacity-75"
            shape="circle"
          >
            <UserOutlined />
          </Button>
        </div>
      </div>
    </Header>
  );
};

export default Head;
