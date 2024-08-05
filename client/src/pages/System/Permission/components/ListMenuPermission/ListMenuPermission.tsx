import { DeleteOutlined, EditOutlined, FullscreenOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, ConfigProvider, Space, Table, TableColumnsType, TableProps } from "antd"
import { TableRowSelection } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import { apiGetMenusNotRecursive } from "../../apis";
import { Menus } from "../../@types/permission.type";
import { useQueryParams } from "@/hooks/useQueryParams";
import ModalDeletePermission from "../Modal/ModalDeletePermission";
import { useLocation, useNavigate } from "react-router-dom";
import { getQueryParams } from "@/utils/helpers";

interface DataType {
    key: React.Key,
    _id: string,
    name: string,
    code: string,
    icon: string,
    order: number,
}

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const ListMenuPermission = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [selectedId, setSelectedId] = useState<string>()
    const [data, setData] = useState<Menus>([])
    const dataWithKey: DataType[] = [];

    const { menu_parent_id } = useQueryParams()
    let { name } = getQueryParams()
    const navigate = useNavigate()
    const location = useLocation()

    const GetMenusNotRecursiveQuery = useQuery({
        queryKey: ["menus-children", menu_parent_id, name],
        queryFn: () => apiGetMenusNotRecursive(menu_parent_id, name)
    })

    useEffect(() => {
        if (GetMenusNotRecursiveQuery.data) {
            setData(GetMenusNotRecursiveQuery.data.data.menuData)
        }

    }, [GetMenusNotRecursiveQuery.data])

    if (data) {
        for (let i = 0; i < data.length; i++) {
            dataWithKey.push({
                key: i + 1,
                _id: data[i]._id,
                code: data[i].code,
                icon: data[i].icon,
                name: data[i].name,
                order: data[i].order,
            })
        }
    }

    const showModal = (_id: string) => {
        setSelectedId(_id)
        setOpen(true)
    }

    const onOk = () => {
        setOpen(false)
    }

    const onCancel = () => {
        setOpen(false)
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: "STT",
            dataIndex: "key",
            rowScope: "row"
        },
        {
            title: "Tên",
            key: "name",
            dataIndex: "name",
        },
        {
            title: "Quyền",
            key: "code",
            dataIndex: "code",
        },
        {
            title: "Icon",
            key: "icon",
            dataIndex: "icon",
        },
        {
            title: "Sắp xếp",
            key: "order",
            dataIndex: "order",
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
                <Space>
                    <Button icon={<FullscreenOutlined rotate={45} />}></Button>
                    <Button icon={<EditOutlined />} onClick={() => navigate(`${location.pathname}${location.search}&mid=${record._id}&code=capnhat`)}></Button>
                    <Button icon={<DeleteOutlined />} onClick={() => showModal(record._id)}></Button>
                </Space>
            )
        },
    ]

    const rowSelection: TableRowSelection<DataType> = {
        // selectedRowKeys,
        // onChange: onSelectChange,
        // getCheckboxProps: (record) => ({
        //     disabled: record.group_id?._id === gid
        // }),
    };



    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgBase: "#141414",
                    colorText: "white",
                    colorTextDescription: "white",
                    colorFillTertiary: "white",
                    colorFill: "white",

                },
                components: {
                    Table: {
                        borderColor: "white",
                        rowSelectedBg: "#1C1C1C",
                        rowSelectedHoverBg: "#1C1C1C",
                        colorIcon: "white",
                    },
                    Checkbox: {
                        colorBgContainerDisabled: "red"
                    },

                }
            }}
        >
            <Table
                columns={columns}
                dataSource={dataWithKey}
                rowSelection={rowSelection}
                onChange={onChange}
                bordered
            />
            {selectedId && <ModalDeletePermission open={open} onOk={onOk} onCancel={onCancel} mid={selectedId} />}
        </ConfigProvider>
    )
}

export default ListMenuPermission