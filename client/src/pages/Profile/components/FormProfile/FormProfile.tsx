import { AppContext } from "@/contexts/app.context"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Button, ConfigProvider, Form, Input, Space } from "antd"
import { useContext, useEffect } from "react"
import { apiUpdateUserById } from "../../apis"
import { User } from "@/pages/System/User/@types/user.type"
import toast from "react-hot-toast"


const FormProfile = () => {
    const { userInfo } = useContext(AppContext)
    const [form] = Form.useForm();
    const queryClient = useQueryClient()

    useEffect(() => {
        if (userInfo) {
            form.setFieldsValue({
                _id: userInfo._id,
                username: userInfo.username,
                fullname: userInfo.fullname,
                email: userInfo.email,
                phone: userInfo.phone,
                unit: userInfo.unit,
                managerment_agent: userInfo.managerment_agent,
                address: userInfo.address,
            })
        }
    }, [userInfo])

    const updateUserInfoMutation = useMutation({
        mutationFn: (value: User) => apiUpdateUserById(value)
    })

    const onFinish = (value: User) => {
        updateUserInfoMutation.mutate(value, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['userInfo'] })
                toast.success("Cập nhật thành công")
            },
            onError: () => {
                toast.error("Cập nhật thất bại")
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
            <div className="pb-6">
                <Form
                    form={form}
                    onFinish={onFinish}
                    className="flex flex-col justify-center items-center"
                    layout="vertical"
                >
                    <Form.Item name="_id" hidden>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Tên đăng nhập" name="username" className="w-[40%]">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Họ tên" name="fullname" className="w-[40%]">
                        <Input allowClear />
                    </Form.Item>
                    <Form.Item label="Email" name="email" className="w-[40%]">
                        <Input allowClear />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" name="phone" className="w-[40%]">
                        <Input allowClear />
                    </Form.Item>
                    <Form.Item label="Đơn vị" name="unit" className="w-[40%]">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Cơ quan quản lý" name="managerment_agent" className="w-[40%]">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Địa chỉ" name="address" className="w-[40%]">
                        <Input allowClear />
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

export default FormProfile