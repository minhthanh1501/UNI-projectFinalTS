import { useContext } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import icons from "@/constants/icons";
import {
  setAccessTokenToLocalStorage,
  setUserInfoToLocalStorage,
} from "@/utils/auth";
import { useMutation } from "@tanstack/react-query";
import "@/styles/index.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AppContext } from "@/contexts/app.context";
import { AccountLogin } from "../../@types/auth.type";
import { apiLoginUser } from "../../apis/index"

const FormLogin = () => {
  const { FaArrowRightToBracket } = icons;
  const navigate = useNavigate();
  const { setIsAuthenticated, setUserInfo } = useContext(AppContext);

  const loginUserMutation = useMutation({
    mutationFn: (value: AccountLogin) => {
      return apiLoginUser(value);
    },
  },);

  const onFinish = (value: AccountLogin) => {
    loginUserMutation.mutate(value, {
      onSuccess: (result) => {
        if (result.data.success) {
          const { accessToken, userData } = result.data;

          const jsonStringify = JSON.stringify(userData);
          setAccessTokenToLocalStorage(accessToken);
          setUserInfoToLocalStorage(jsonStringify);

          setIsAuthenticated(Boolean(accessToken));
          setUserInfo(userData);
          toast.success(
            <div style={{ textAlign: "center" }}>
              <p>Đăng nhập thành công.</p>
              <p>Đang chuyển hướng!</p>
            </div>
          );
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          toast.error("sai mật khẩu hoặc tài khoản");
        }
      },
      onError: (error: any) => {
        toast.error("lỗi line 43", error);
      },
    });
  };

  return (
    <div className="w-[32%] bg-primary p-10 rounded-3xl">
      <h1 className="text-white font-bold text-[32px]">
        CSDL Chuyên Ngành - QA
      </h1>
      <p className="text-white pb-8">Đăng nhập hệ thống</p>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
        >
          <Input
            size="large"
            variant="outlined"
            prefix={<UserOutlined className="site-form-item-icon text-white" />}
            placeholder="Tên đăng nhập"
            className="rounded-3xl bg-transparent text-white"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password
            size="large"
            variant="outlined"
            prefix={<LockOutlined className="site-form-item-icon text-white" />}
            type="password"
            placeholder="Mật khẩu"
            className="bg-transparent rounded-3xl text-white"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" noStyle valuePropName="checked">
            <Checkbox className="text-white">Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button rounded-3xl"
            block
          >
            <FaArrowRightToBracket />
            Đăng nhập
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button bg-primary  rounded-3xl text-[14px] hover:border-[#3FA2F6] hover:text-[#3FA2F6]"
            block
          >
            <FaArrowRightToBracket />
            Đăng nhập thông qua hệ thống xác thực tập trung (SSO)
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormLogin;
