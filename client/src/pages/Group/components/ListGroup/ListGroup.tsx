import { Button, ConfigProvider, Space, Table, TableColumnsType, TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { apiGetGroups } from "../../apis";
import { useEffect, useState } from "react";
import ModalCreateGroup from "../Modal/ModalCreateGroup";
import { DeleteFilled, EditFilled, MoreOutlined } from "@ant-design/icons";
import ModalDeleteGroup from "../Modal/ModalDeleteGroup";
import { useSearchParams } from "react-router-dom";

interface DataType {
    key: React.Key;
    _id: string;
    code: string;
    name: string;
}



const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};


const ListGroup = () => {
    const [data, setData] = useState<DataType[]>([])
    const dataWithKey: DataType[] = [];
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
    const [groupId, setGroupId] = useState<string | number>()
    const [searchParams, setSearchParams] = useSearchParams()

    const showModal = (id: string | number) => {
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
    const showModalDelete = (id: string | number) => {
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

    let name = searchParams.get("name") || null

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
                    <Button icon={<EditFilled />} shape="circle" onClick={() => showModal(record._id)} ></Button>
                    <Button icon={<DeleteFilled />} danger shape="circle" onClick={() => showModalDelete(record._id)}></Button>
                    <Button icon={<MoreOutlined />} shape="circle"></Button>
                </Space>
            ),
            width: 150
        },
    ];

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
                    Checkbox: {

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
                groupId ? (<ModalCreateGroup open={isModalOpen} onOk={handleOk} onCancel={handleCancel} uid={groupId} />) : null
            }
            {
                groupId ? (<ModalDeleteGroup open={isModalOpenDelete} onOk={handleOkDelete} onCancel={handleCancelDelete} uid={groupId} />) : null
            }
        </ConfigProvider>

    )
}

export default ListGroup