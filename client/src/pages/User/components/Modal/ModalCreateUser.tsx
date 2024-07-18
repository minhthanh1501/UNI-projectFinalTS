import { RedoOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Modal, Select, Space, Switch } from "antd"
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiCreateUser, apiGetUserById } from "../../apis";
import { DataCreateUser } from "../../@types/user.type";
const { Option } = Select;

type ThemeModal = {
    backgroundColor: string,
    colorBgContainer: string
    colorBgBlur: string
}

const defaultTheme: ThemeModal = {
    backgroundColor: "#141414",
    colorBgContainer: "white",
    colorBgBlur: "red"
};

interface ModalCreateUserProps {
    open: boolean,
    onOk: () => void,
    onCancle: () => void,
    uid?: string | number
}

const ModalCreateUser: React.FC<ModalCreateUserProps> = ({ open, onOk, onCancle, uid }) => {
    const [form] = Form.useForm();
    const queryClient = useQueryClient()
    const [addMode, setAddMode] = useState<boolean>(true)

    const GetUser = useQuery({
        queryKey: ["user"],
        queryFn: () => apiGetUserById(uid),
        enabled: Boolean(uid)
    })

    const CreateUserMutation = useMutation({
        mutationFn: (value: DataCreateUser) => apiCreateUser(value)
    })

    const handleOk = () => {
        form.submit()
        form.setFieldsValue({ name: "" })
    }

    const onFinish = (value: DataCreateUser) => {
        CreateUserMutation.mutate(value, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['users'] })
            }
        })
        onOk();
    }



    return (
        <div>
            <ConfigProvider
                theme={{
                    token: {
                        colorBgBase: defaultTheme.backgroundColor,
                        colorTextBase: "white",
                        colorBorder: "#222222",
                    },
                    components: {
                        Button: {

                        }
                    }
                }}

            >
                <Modal title="Thêm người dùng" open={open} onOk={handleOk} onCancel={onCancle} style={{ minWidth: "1000px" }} footer={false}>
                    <Form form={form} onFinish={onFinish} name="validateOnly" layout="vertical" autoComplete="off" className="bg-primary border-t-2">
                        <div className="flex gap-5">
                            <Form.Item name="username" label="Tên đăng nhập" rules={[{ required: true }]} className="min-w-[48%]">
                                <Input />
                            </Form.Item>
                            <Form.Item name="actived" label="Kích hoạt" valuePropName="checked" className="min-w-[48%]">
                                <Switch />
                            </Form.Item>
                        </div>
                        <div className="flex gap-5">
                            <Form.Item name="password" label="Mật khẩu" className="min-w-[48%]" >
                                <Input />
                            </Form.Item>
                            <Form.Item name="repassword" label="Xác nhận mật khẩu" rules={[{ required: true }]} className="min-w-[48%]">
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="flex gap-5">
                            <Form.Item name="fullname" label="Họ và tên" rules={[{ required: true }]} className="min-w-[48%]">
                                <Input />
                            </Form.Item>
                            <Form.Item name="email" label="Email" rules={[{ required: true }]} className="min-w-[48%]">
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="flex gap-5">
                            <Form.Item
                                name="unit"
                                label="Đơn vị"
                                hasFeedback
                                rules={[{ required: true, message: 'Please select your country!' }]}
                                className="min-w-[48%]"
                            >
                                <Select placeholder="Please select a country">
                                    <Option value="china">China</Option>
                                    <Option value="usa">U.S.A</Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="managerment_agent"
                                label="Cơ quan quản lý"
                                hasFeedback
                                rules={[{ required: true, message: 'Please select your country!' }]}
                                className="min-w-[48%]"
                            >
                                <Select placeholder="Please select a country">
                                    <Option value="china">China</Option>
                                    <Option value="usa">U.S.A</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="flex gap-5">
                            <Form.Item name="phone" label="SĐT" rules={[{ required: true }]} className="min-w-[48%]">
                                <Input />
                            </Form.Item>
                            <Form.Item name="position" label="Chức vụ" rules={[{ required: true }]} className="min-w-[48%]">
                                <Input />
                            </Form.Item>
                        </div>
                        <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Space
                                style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}>
                                <Button type="primary" icon={<SaveOutlined />}>Lưu</Button>
                                <Button htmlType="reset" icon={<RedoOutlined />}>Làm mới</Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
            </ConfigProvider>
        </div>
    )
}

export default ModalCreateUser