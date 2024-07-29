import { RedoOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Form, Input, Modal, Space } from "antd"
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { DataCreateGroup, DataUpdateGroup } from "../../@types/group.type";
import { Group } from "../../@types/group.type";
import { apiCreateGroup, apiGetGroupById, apiUpdateGroupById } from "../../apis";
import toast from "react-hot-toast";

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

interface ModalCreateGroupProps {
    open: boolean,
    onOk: () => void,
    onCancel: () => void,
    gid?: string | number
}

const ModalCreateGroup: React.FC<ModalCreateGroupProps> = ({ open, onOk, onCancel, gid }) => {
    const [form] = Form.useForm();
    const queryClient = useQueryClient()
    const [addMode, setAddMode] = useState<boolean>(true)
    const [groupData, setGroupData] = useState<Group>()

    useEffect(() => {
        if (gid) {
            setAddMode(false);
        } else {
            setAddMode(true);
        }
    }, [gid]);

    const getGroupQuery = useQuery({
        queryKey: ["group"],
        queryFn: () => apiGetGroupById(gid),
        enabled: Boolean(gid),
    })

    useEffect(() => {
        if (getGroupQuery.data) {
            setGroupData(getGroupQuery.data.data.groupData);
        }
    }, [getGroupQuery.isSuccess, getGroupQuery.data]);


    useEffect(() => {
        if (!addMode && groupData) {
            form.setFieldsValue({
                _id: groupData._id,
                code: groupData.code,
                name: groupData.name,
            });
        }
    }, [groupData, addMode, form]);

    const CreateGroupMutation = useMutation({
        mutationFn: (value: DataCreateGroup) => apiCreateGroup(value),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] })
            toast.success("Tạo nhóm thành công")
        },
        onError: (error) => {
            toast.error(`Không thành công ${error}`)
        }
    })

    const UpdateGroupMutation = useMutation({
        mutationFn: (value: DataUpdateGroup) => apiUpdateGroupById(value),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] })
            toast.success("Cập nhật nhóm thành công")
        },
        onError: (error) => {
            toast.error(`Không thành công ${error}`)
        }
    })

    const handleOk = () => {
        form.submit()
    }

    const onFinish = (value: any) => {
        if (addMode) {
            CreateGroupMutation.mutate(value)
        } else {
            UpdateGroupMutation.mutate(value)
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
                }}

            >
                <Modal title={addMode ? "Thêm nhóm" : "Edit nhóm"} open={open} onOk={handleOk} onCancel={onCancel} style={{ minWidth: "1000px" }} footer={false}>
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
                            <Form.Item name="code" label="Mã nhóm" className="min-w-[48%]">
                                <Input disabled={!addMode} />
                            </Form.Item>
                            <Form.Item name="name" label="Tên nhóm" className="min-w-[48%]">
                                <Input />
                            </Form.Item>
                        </div>
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

export default ModalCreateGroup