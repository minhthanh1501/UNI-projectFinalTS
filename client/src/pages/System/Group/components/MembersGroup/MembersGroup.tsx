import { Users } from "@/pages/System/User/@types/user.type";
import { apiGetUsers } from "@/pages/System/User/apis";
import { DeleteFilled, } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, ConfigProvider, Space, Table, TableColumnsType, TableProps } from "antd"
import { useEffect, useState } from "react";
import { apiGetGroupById } from "../../apis";
import { Group } from "../../@types/group.type";
import { getQueryParams } from "@/utils/helpers";
import ModalDeleteUserFromGroup from "../Modal/ModalDeleteUserFromGroup";

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

const MembersGroup = () => {
    const [data, setData] = useState<Users>([])
    const [groupDetailData, setGroupDetailData] = useState<Group>()
    const dataWithKey: DataType[] = [];
    const [openModalDeleteUserFromGroup, setOpenModalDeleteUserFromGroup] = useState<boolean>(false)
    const [userId, setUserId] = useState<string>()
    const { gid } = getQueryParams();

    const GetDetailGroupQuery = useQuery({
        queryKey: ["groupDetail", gid],
        queryFn: () => apiGetGroupById(gid)
    })

    const GetUsersFromGroupQuery = useQuery({
        queryKey: ["users", gid],
        queryFn: () => apiGetUsers({ gid: gid || undefined })
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

    if (data) {
        for (let i = 0; i < data.length; i++) {
            dataWithKey.push({
                key: i + 1,
                _id: data[i]._id,
                username: data[i].username,
                fullname: data[i].fullname,
                email: data[i].email,
            });
        }
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
                    <Button icon={<DeleteFilled />} danger shape="circle" onClick={() => showModalDeleteUserFromGroup(record._id)}></Button>
                </Space>
            ),
            width: 150
        },
    ];

    //Modal DeleteUserFromGroup
    const showModalDeleteUserFromGroup = (_id: string) => {
        setOpenModalDeleteUserFromGroup(true)
        setUserId(_id)
    }
    const handleOkModalDeleteUserFromGroup = () => {
        setOpenModalDeleteUserFromGroup(false)
    }
    const handleCancelModalDeleteUserFromGroup = () => {
        setOpenModalDeleteUserFromGroup(false)
    }
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
                rowSelection={{}}
                onChange={onChange}
                bordered
            />
            {gid ? (
                <ModalDeleteUserFromGroup open={openModalDeleteUserFromGroup}
                    onOk={handleOkModalDeleteUserFromGroup}
                    onCancel={handleCancelModalDeleteUserFromGroup} gid={gid} uid={userId} />
            ) : null}
        </ConfigProvider>
    )
}

export default MembersGroup