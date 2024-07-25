import ButtonCustom from "@/components/commons/ButtonCustom";
import { Users } from "@/pages/System/User/@types/user.type";
import { apiGetUsers } from "@/pages/System/User/apis";
import { CloseCircleOutlined, CloseOutlined, DeleteFilled, PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, ConfigProvider, Modal, Space, Table, TableColumnsType, TableProps } from "antd"
import { useEffect, useState } from "react";
import ModalAddUsersToGroup from "./SubModal/ModalAddUsersToGroup";
import { apiGetGroupById } from "../../apis";
import { Group } from "../../@types/group.type";

interface ModalListUserProps {
    open: boolean,
    onOk: () => void,
    onCancel: () => void,
    gid: string
}

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

const ModalListUser: React.FC<ModalListUserProps> = ({ open, onOk, onCancel, gid }) => {
    const [data, setData] = useState<Users>([])
    const [groupDetailData, setGroupDetailData] = useState<Group>()
    const dataWithKey: DataType[] = [];
    const [openModalAddUserToGroup, setOpenModalAddUserToGroup] = useState<boolean>(false)

    const GetDetailGroupQuery = useQuery({
        queryKey: ["groupDetail", gid],
        queryFn: () => apiGetGroupById(gid)
    })

    const GetUsersFromGroupQuery = useQuery({
        queryKey: ["users", gid],
        queryFn: () => apiGetUsers({ gid })
    })

    useEffect(() => {
        if (GetUsersFromGroupQuery.data) {
            setData(GetUsersFromGroupQuery.data.data.userData)
        }

    }, [GetUsersFromGroupQuery.data])

    useEffect(() => {
        if (GetDetailGroupQuery.data) {
            setGroupDetailData(GetDetailGroupQuery.data.data.groupData)
        }

    }, [GetDetailGroupQuery.data])

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
            title: 'Họ tên',
            dataIndex: 'fullname',
            key: 'fullname',
            fixed: 'left',
            sorter: (a, b) => a.fullname.localeCompare(b.fullname),
            width: 300
        },
        {
            title: 'Tên đăng nhập',
            dataIndex: 'username',
            key: 'username',
            fixed: 'left',
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
                    <Button icon={<DeleteFilled />} danger shape="circle" ></Button>
                </Space>
            ),
            width: 150
        },
    ];

    // ModalListUser
    const handleOk = () => {

        onOk()
    }

    // SubModal
    const showModalAddUserToGroup = () => {
        setOpenModalAddUserToGroup(true)
    }
    const handleOkModalAddUserToGroup = () => {
        setOpenModalAddUserToGroup(false)
    }

    const handleCancelModalAddUserToGroup = () => {
        setOpenModalAddUserToGroup(false)
    }

    return (
        <ConfigProvider
            theme={{
                token: {

                },
                components: {

                }
            }}
        >
            <Modal
                title={`Danh sách người dùng của nhóm ${groupDetailData?.name}`}
                open={open}
                onOk={handleOk}
                onCancel={onCancel}
                style={{
                    minWidth: 1480,
                }}

            >
                <div className="flex justify-end py-5 gap-5">
                    <ButtonCustom
                        style={{}}
                        icon={<PlusOutlined />}
                        nameButton={"Thêm thành viên"}
                        onClick={showModalAddUserToGroup}
                    />
                    <ButtonCustom
                        icon={<CloseCircleOutlined />}
                        style={{
                            backgroundColor: "#262626",
                            color: "gray"
                        }}
                        nameButton={"Xóa"}
                        disable={true}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={dataWithKey}
                    rowSelection={{}}
                    onChange={onChange}
                    bordered
                />
            </Modal>
            {gid ? (<ModalAddUsersToGroup open={openModalAddUserToGroup} onOk={handleOkModalAddUserToGroup} onCancel={handleCancelModalAddUserToGroup} gid={gid} />) : null}
        </ConfigProvider>
    )
}

export default ModalListUser