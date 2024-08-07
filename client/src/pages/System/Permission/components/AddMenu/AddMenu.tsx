import { RedoOutlined, SaveOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, ConfigProvider, Form, Input, Select, Space } from "antd"
import { useEffect, useState } from "react";
import { apiCreateMenu, apiGetMenuById, apiUpdateMenuById } from "../../apis";
import toast from "react-hot-toast";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Menu } from "../../@types/permission.type";
import { getQueryParams } from "@/utils/helpers";


interface ValueFormType {
    _id: string,
    code?: string,
    name: string,
    expression: string,
    menuType: string,
    order: number,
    url: string,
    icon: string,
    parent_id: string,
    permission: string,
    mobile: string,
    note: string
}


const AddMenu = () => {

    const [form] = Form.useForm();
    const [addMode, setAddMode] = useState<boolean>(true)
    const [parentId, setParentId] = useState<string>()
    const [menuData, setMenuData] = useState<Menu>()

    const { menu_parent_id, mid } = useQueryParams()
    const { name } = getQueryParams()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (mid) {
            setAddMode(false)
        } else {
            setAddMode(true)
        }
    }, [mid])

    useEffect(() => {
        if (menu_parent_id) {
            setParentId(menu_parent_id)
        }

    }, [menu_parent_id])

    const getMenuByIdQuery = useQuery({
        queryKey: ['menuById'],
        queryFn: () => apiGetMenuById(mid),
        enabled: Boolean(mid)
    })

    useEffect(() => {
        if (getMenuByIdQuery.data) {
            setMenuData(getMenuByIdQuery.data.data.menuData)
        }
    }, [getMenuByIdQuery.data])

    useEffect(() => {
        if (!addMode && menuData) {
            form.setFieldsValue({
                _id: menuData._id,
                parent_id: menuData.parent_id,
                name: menuData.name,
                expression: menuData.expression,
                menuType: menuData.menuType,
                order: menuData.order,
                url: menuData.url,
                icon: menuData.icon,
                permission: menuData.permission,
                mobile: menuData.mobile,
                note: menuData.note,
            });
        }
    }, [menuData, addMode, form]);

    const addMenuMutation = useMutation({
        mutationFn: (value: ValueFormType) => apiCreateMenu(value)
    })

    const updateMenuMutation = useMutation({
        mutationFn: (value: ValueFormType) => apiUpdateMenuById(value)
    })

    const onFinish = (value: ValueFormType) => {
        if (addMode) {
            addMenuMutation.mutate(value, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['menus-direction'] })
                    queryClient.invalidateQueries({ queryKey: ['menus-children', menu_parent_id, name] })
                    toast.success("Tạo mới thành công")
                }
            })
        } else {
            updateMenuMutation.mutate(value, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['menus-direction'] })
                    queryClient.invalidateQueries({ queryKey: ['menus-children', menu_parent_id, name] })
                    toast.success("cập nhật thành công")
                }
            })
        }
    }

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };


    return <ConfigProvider
        theme={{
            token: {
                colorBgBase: "#141414",
                colorTextBase: "white",
                colorBorder: "#222222",
                colorBgContainerDisabled: "transparent",
            },
            components: {
                Select: {
                    controlItemBgActive: "#1c1c1c"
                }
            }
        }}

    >
        <Form
            form={form}
            onFinish={onFinish}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            className="bg-primary"
        >
            <div className="flex gap-5">
                <Form.Item name="_id" hidden>
                    <Input />
                </Form.Item>
                {parentId && (
                    <Form.Item name="parent_id" initialValue={parentId} label="Tên quyền" hidden>
                        <Input />
                    </Form.Item>
                )}
                <Form.Item name="name" label="Tên quyền" rules={[{ required: true }]} className="min-w-[48%]">
                    <Input />
                </Form.Item>
                <Form.Item name="expression" label="Biểu thức" rules={[{ required: true }]} className="min-w-[48%]">
                    <Input />
                </Form.Item>
            </div>
            <div className="flex gap-5">
                <Form.Item name="menuType" initialValue={"path"} hasFeedback label="Loại quyền" className="min-w-[48%]">
                    <Select
                        onChange={handleChange}
                        options={[
                            { value: 'path', label: 'Đường dẫn' },
                            { value: 'action', label: 'Thao tác' },
                            { value: 'hidden', label: 'Đường dẫn (ẩn khỏi menu)' },
                        ]}
                    />
                </Form.Item>
                <Form.Item name="order" label="Sắp xếp" rules={[{ required: true }]} className="min-w-[48%]">
                    <Input />
                </Form.Item>
            </div>
            <div className="flex gap-5">
                <Form.Item
                    name="url"
                    label="Đường dẫn"
                    className="min-w-[48%]"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="icon"
                    label="Icon"
                    className="min-w-[48%]"
                >
                    <Input />
                </Form.Item>
            </div>
            <div className="w-full">
                <Form.Item name="permission" label="Quyền" className="min-w-[96%]">
                    <Input />
                </Form.Item>
            </div>
            <div className="w-full">
                <Form.Item name="mobile" label="Quyền mobile" className="min-w-[96%]">
                    <Input />
                </Form.Item>
            </div>
            <Form.Item name="note" label="Ghi chú" className="min-w-[96%]">
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
    </ConfigProvider>
}

export default AddMenu