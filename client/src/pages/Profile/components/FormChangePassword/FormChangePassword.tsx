import { useMutation } from "@tanstack/react-query";
import { Button, ConfigProvider, Form, Input, Space } from "antd";
import { apiChangePassword, } from "../../apis";
import toast from "react-hot-toast";
import { AxiosResponse } from "axios";
import { ApiUserResponse } from "@/@types/response.type";
import { User } from "@/pages/System/User/@types/user.type";


const FormChangePassword = () => {
    const [form] = Form.useForm();

    const changePasswordMutation = useMutation({
        mutationFn: (value: { oldpassword: string, newpassword: string }) => apiChangePassword(value)
    })

    const onFinish = (value: { oldpassword: string, newpassword: string }) => {
        changePasswordMutation.mutate(value, {
            onSuccess: (data: AxiosResponse<ApiUserResponse<User>, any>) => {
                if (data.data.status) {
                    toast.success("Đổi mật khẩu thành công")
                } else {
                    toast.error(data.data.mes)
                }
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgContainerDisabled: "#1c1c1c",
                    colorBgContainer: "#141414",
                    colorTextDisabled: "#c2c2c2",
                    colorTextHeading: "#c2c2c2",
                    colorTextBase: "white",
                }
            }}
        >
            <div className="pb-6 h-screen">
                <Form
                    form={form}
                    onFinish={onFinish}
                    className="flex flex-col justify-center items-center"
                    layout="vertical"
                >
                    <Form.Item label="Mật khẩu cũ" name="oldpassword" className="w-[40%]" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label={`Mật khẩu mới`} name="newpassword" className="w-[40%]" >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="Xác nhận mật khẩu" name="confirmpassword" className="w-[40%]">
                        <Input.Password />
                    </Form.Item>
                    <Space className="flex justify-end w-[40%]">
                        <Button htmlType="reset" type="default">Làm mới</Button>
                        <Button type="primary" htmlType="submit">Lưu</Button>
                    </Space>
                </Form>
            </div>
        </ConfigProvider>
    )
}

export default FormChangePassword