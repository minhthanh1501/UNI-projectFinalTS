import { Button, ConfigProvider, Dropdown, Layout, MenuProps, Space } from "antd";
import logo from "../..//assets/images/quochuy.png";
import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Header } = Layout;

const Head = () => {

  const handleLogout = () => {
    localStorage.removeItem("accessToken")

    window.location.reload()
  }


  const items: MenuProps['items'] = [
    {
      label: <Link to={"/user-information.html"}>Thông tin cá nhân</Link>,
      key: '0',
    },
    {
      label: <Link to={"/"}>Đổi mật khẩu</Link>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: <Link to={"/"}>Chủ đề</Link>,
      key: '3',
    },
    {
      label: <Link to={"/"}>Version</Link>,
      key: '4',
    },
    {
      type: 'divider',
    },
    {
      label: <Link to={'/'} onClick={handleLogout}>Đăng xuất</Link>,
      key: '5',
      danger: true
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: "#1f1f1f",
          colorText: "white",
          colorBorderSecondary: "white",
          controlItemBgHover: "#313131",

        },
        components: {

        }
      }}
    >
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
          <div className="flex gap-3 items-center">
            <Button
              className="text-white text-[16px] bg-transparent rounded-3xl border-none hover:opacity-75"
              shape="circle"
            >
              <QuestionCircleOutlined />
            </Button>
            <Space>
              <Dropdown menu={{ items }} trigger={['click']} className="">
                <a onClick={(e) => e.preventDefault()}>
                  <UserOutlined className="text-white text-[16px] bg-transparent rounded-3xl border-none hover:opacity-75"
                    shape="circle" />
                </a>
              </Dropdown>
            </Space>

          </div>
        </div>
      </Header>
    </ConfigProvider>
  );
};

export default Head;
