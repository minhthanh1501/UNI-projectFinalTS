import { RedoOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Modal, Select, Space, Switch } from "antd"
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiCreateUser, apiGetUserById, apiUpdateUserById } from "../../apis";
import { DataCreateUser, DataUpdateUser, User } from "../../@types/user.type";
import toast from "react-hot-toast";
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
    onCancel: () => void,
    uid?: string | number
}

const ModalCreateUser: React.FC<ModalCreateUserProps> = ({ open, onOk, onCancel, uid }) => {
    const [form] = Form.useForm();
    const queryClient = useQueryClient()
    const [addMode, setAddMode] = useState<boolean>(true)
    const [userData, setUserData] = useState<User>()

    useEffect(() => {
        if (uid) {
            setAddMode(false);
        } else {
            setAddMode(true);
        }
    }, [uid]);

    const GetUser = useQuery({
        queryKey: ["user"],
        queryFn: () => apiGetUserById(uid),
        enabled: Boolean(uid),
    })

    useEffect(() => {
        if (GetUser.data) {
            setUserData(GetUser.data.data.userData);
        }
    }, [GetUser.isSuccess, GetUser.data]);


    useEffect(() => {
        if (!addMode && userData) {
            form.setFieldsValue({
                _id: userData._id,
                username: userData.username,
                actived: userData.active,
                email: userData.email,
                fullname: userData.fullname,
                unit: userData.unit,
                managerment_agent: userData.managerment_agent,
                phone: userData.phone,
                position: userData.position,
                address: userData.address,
            });
        }
    }, [userData, addMode, form]);

    const CreateUserMutation = useMutation({
        mutationFn: (value: DataCreateUser) => apiCreateUser(value),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            toast.success("Thêm người dùng thành công")
        },
        onError: () => {
            toast.error("Không thành công")
        }
    })

    const UpdateUserMutation = useMutation({
        mutationFn: (value: DataUpdateUser) => apiUpdateUserById(value),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            toast.success("Thêm người dùng thành công")
        },
        onError: () => {
            toast.error("Không thành công")
        }
    })

    const handleOk = () => {
        form.submit()
    }

    const onFinish = (value: any) => {
        if (addMode) {
            CreateUserMutation.mutate(value)
        } else {
            UpdateUserMutation.mutate(value)
        }
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
                        colorBgContainerDisabled: "transparent"
                    },
                    components: {
                        Button: {

                        },
                    }
                }}

            >
                <Modal title={addMode ? "Thêm người dùng" : "Edit người dùng"} open={open} onOk={handleOk} onCancel={onCancel} style={{ minWidth: "1000px" }} footer={false}>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        name="validateOnly"
                        layout="vertical"
                        autoComplete="off"
                        className="bg-primary border-t-2"
                        initialValues={{

                        }}
                    >
                        <div className="flex gap-5">
                            <Form.Item name="_id" hidden>
                                <Input />
                            </Form.Item>
                            <Form.Item name="username" label="Tên đăng nhập" rules={[{ required: true }]} className="min-w-[48%]">
                                <Input disabled={!addMode} />
                            </Form.Item>
                            <Form.Item name="active" label="Kích hoạt" valuePropName="checked" className="min-w-[48%]">
                                <Switch />
                            </Form.Item>
                        </div>
                        {addMode && (
                            <div className="flex gap-5">
                                <Form.Item name="password" label="Mật khẩu" className="min-w-[48%]" >
                                    <Input />
                                </Form.Item>
                                <Form.Item name="repassword" label="Xác nhận mật khẩu" rules={[{ required: true }]} className="min-w-[48%]">
                                    <Input />
                                </Form.Item>
                            </div>
                        )}
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
                                className="min-w-[48%]"
                            >
                                <Select placeholder="Please select a country">
                                    <Option value="china">China</Option>
                                    <Option value="usa">U.S.A</Option>
                                </Select>
                            </Form.Item>
                        </div>
                        <div className="flex gap-5">
                            <Form.Item name="phone" label="SĐT" className="min-w-[48%]">
                                <Input />
                            </Form.Item>
                            <Form.Item name="position" label="Chức vụ" className="min-w-[48%]">
                                <Input />
                            </Form.Item>
                        </div>
                        <Form.Item name="address" label="Địa chỉ" >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Space
                                style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}>
                                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>Lưu</Button>
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