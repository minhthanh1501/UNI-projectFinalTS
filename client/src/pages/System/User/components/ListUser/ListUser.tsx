import { Button, ConfigProvider, Space, Table, TableColumnsType, TableProps } from "antd";
import { useQuery } from "@tanstack/react-query";
import { apiGetUsers } from "../../apis";
import { useEffect, useState } from "react";
import ModalCreateUser from "../Modal/ModalCreateUser";
import { DeleteFilled, EditFilled, MoreOutlined } from "@ant-design/icons";
import ModalDeleteUser from "../Modal/ModalDeleteUser";
import { useSearchParams } from "react-router-dom";
import { Users } from "../../@types/user.type";


interface DataType {
    key: React.Key;
    _id: string;
    username: React.ReactNode;
    fullname: string;
    email: string;
}



const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};


const ListUser: React.FC = () => {
    const [data, setData] = useState<Users>([])
    const dataWithKey: DataType[] = [];
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | number>()
    const [searchParams, setSearchParams] = useSearchParams()
    const [pageSize, setPageSize] = useState<number>()

    const showModal = (id: string | number) => {
        setIsModalOpen(true);
        setUserId(id)
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setUserId(undefined)
    };

    // Modal delete
    const showModalDelete = (id: string | number) => {
        setIsModalOpenDelete(true);
        setUserId(id)
    };

    const handleOkDelete = () => {
        setIsModalOpenDelete(false);
        console.log("xoa");
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
        setUserId(undefined)
    };

    let email = searchParams.get("email") || undefined
    let fullname = searchParams.get("fullname") || undefined

    // react-query
    const GetUserQuery = useQuery({
        queryKey: ["users", email, fullname],
        queryFn: () => apiGetUsers({ email, fullname })
    })

    useEffect(() => {
        if (GetUserQuery.data) {
            setData(GetUserQuery.data.data.userData)
        }

    }, [GetUserQuery.data])

    for (let i = 0; i < data.length; i++) {
        dataWithKey.push({
            key: i + 1,
            _id: data[i]._id,
            username: data[i].username,
            fullname: data[i].fullname,
            email: data[i].email,
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
            title: 'Tên đăng nhập',
            dataIndex: 'username',
            key: 'username',
            fixed: 'left',
        },
        {
            title: 'Họ tên',
            dataIndex: 'fullname',
            key: 'fullname',
            fixed: 'left',
            sorter: (a, b) => a.fullname.localeCompare(b.fullname),
            width: 300
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
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
                pagination={{
                    onChange(page, pageSize) {
                        setPageSize(pageSize)
                    },
                    position: ["bottomRight"],
                    pageSize: pageSize,
                    total: dataWithKey.length, // Tổng số item trong dữ liệu
                    showSizeChanger: true, // Hiển thị bộ chọn số lượng item mỗi trang
                    showQuickJumper: true, // Hiển thị bộ chọn trang nhanh
                    showTotal: (total, range) => `Hiển thị: ${range[0]}-${range[1]}/${total} kết quả`
                }}
                rowSelection={{}}
                onChange={onChange}
                bordered

            />
            {
                userId ? (<ModalCreateUser open={isModalOpen} onOk={handleOk} onCancel={handleCancel} uid={userId} />) : null
            }
            {
                userId ? (<ModalDeleteUser open={isModalOpenDelete} onOk={handleOkDelete} onCancel={handleCancelDelete} uid={userId} />) : null
            }
        </ConfigProvider>

    )
}

export default ListUser