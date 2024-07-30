import { Button, ConfigProvider, Space, Table, TableColumnsType, TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { apiGetGroups } from "../../apis";
import { useEffect, useState } from "react";
import ModalCreateGroup from "../Modal/ModalCreateGroup";
import { DeleteFilled, EditFilled, SettingOutlined, UsergroupDeleteOutlined } from "@ant-design/icons";
import ModalDeleteGroup from "../Modal/ModalDeleteGroup";
import { useLocation, useNavigate } from "react-router-dom";
import { Groups } from "../../@types/group.type";
import { getQueryParams } from "@/utils/helpers";

interface DataType {
    key: React.Key;
    _id: string;
    code: string;
    name: string;
}

// type TableRowSelection<T> = TableProps<T>['rowSelection'];



const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};


const ListGroup = () => {
    const [data, setData] = useState<Groups>([])
    const dataWithKey: DataType[] = [];
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
    const [groupId, setGroupId] = useState<string>()
    const navigate = useNavigate()
    const location = useLocation()
    // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const showModal = (id: string) => {
        setIsModalOpen(true);
        setGroupId(id)
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setGroupId(undefined)
    };

    // Modal delete
    const showModalDelete = (id: string) => {
        setIsModalOpenDelete(true);
        setGroupId(id)
    };

    const handleOkDelete = () => {
        setIsModalOpenDelete(false);
        console.log("xoa");
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
        setGroupId(undefined)
    };

    // Modal List User
    const handleNavigate = (gid: string) => {
        navigate(`${location.pathname}?gid=${gid}`)
    };


    let { name } = getQueryParams()
    // react-query
    const getGroupsQuery = useQuery({
        queryKey: ["groups", name],
        queryFn: () => apiGetGroups(name)
    })

    useEffect(() => {
        if (getGroupsQuery.data) {
            setData(getGroupsQuery.data.data.groupData)
        }

    }, [getGroupsQuery.data])

    for (let i = 0; i < data.length; i++) {
        dataWithKey.push({
            key: i + 1,
            _id: data[i]._id,
            code: data[i].code,
            name: data[i].name,
        });
    }

    const columns: TableColumnsType<DataType> = [
        Table.SELECTION_COLUMN,
        {
            title: 'STT',
            dataIndex: 'key',
            rowScope: 'row',

        },
        {
            title: 'Mã nhóm',
            dataIndex: 'code',
            key: 'code',
            fixed: 'left',
        },
        {
            title: 'Tên nhóm',
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: 300
        },
        {
            title: 'Thao tác',
            dataIndex: "key",
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button title="Sửa" icon={<EditFilled />} shape="circle" onClick={() => showModal(record._id)}>
                    </Button>
                    <Button title="Thành viên" icon={<UsergroupDeleteOutlined />} shape="circle" onClick={() => handleNavigate(record._id)} >
                    </Button>
                    <Button title="Phân quyền" icon={<SettingOutlined />} shape="circle">
                    </Button>
                    <Button title="Xóa" icon={<DeleteFilled />} danger shape="circle" onClick={() => showModalDelete(record._id)}>
                    </Button>
                </Space>
            ),
            width: 150
        },
    ];

    // const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    //     console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    //     setSelectedRowKeys(newSelectedRowKeys);
    // };

    // const rowSelection: TableRowSelection<DataType> = {
    //     selectedRowKeys,
    //     onChange: onSelectChange,
    // };

    // const handleClickSelection = () => {
    //     console.log("hehe");
    // }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgBase: "#141414",
                    colorText: "white",
                    colorTextDescription: "white",
                    colorFillTertiary: "white",
                    colorFill: "white"
                },
                components: {
                    Table: {
                        borderColor: "white",
                        rowSelectedBg: "#1C1C1C",
                        rowSelectedHoverBg: "#1C1C1C",
                        colorIcon: "white",
                    },
                }
            }}
        >
            <Table
                columns={columns}
                dataSource={dataWithKey}
                rowSelection={{}}
                onChange={onChange}
                bordered
            />
            {
                groupId ? (<ModalCreateGroup open={isModalOpen} onOk={handleOk} onCancel={handleCancel} gid={groupId} />) : null
            }
            {
                groupId ? (<ModalDeleteGroup open={isModalOpenDelete} onOk={handleOkDelete} onCancel={handleCancelDelete} gid={groupId} />) : null
            }
        </ConfigProvider>

    )
}

export default ListGroup