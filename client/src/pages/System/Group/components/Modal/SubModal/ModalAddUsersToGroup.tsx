import { ConfigProvider, Modal, Table, TableColumnsType, TableProps } from "antd"
import { ModalGroupProps } from "../../../@types/modalprops.type"
import { useEffect, useState } from "react";
import { Users } from "@/pages/System/User/@types/user.type";
import { apiGetUsers } from "@/pages/System/User/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAddUserToGroup } from "../../../apis";

interface DataType {
    key: React.Key;
    _id: string;
    username: React.ReactNode;
    fullname: string;
    email: string;
    group_id: string[]
}

type TableRowSelection<T> = TableProps<T>['rowSelection'];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const ModalAddUsersToGroup: React.FC<ModalGroupProps> = ({ open, onOk, onCancel, gid }) => {
    const [data, setData] = useState<Users>([])
    const dataWithKey: DataType[] = [];
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const queryClient = useQueryClient()


    const GetUsersQuery = useQuery({
        queryKey: ["users"],
        queryFn: () => apiGetUsers({})
    })

    useEffect(() => {
        if (GetUsersQuery.data) {
            setData(GetUsersQuery.data.data.userData)
        }

    }, [GetUsersQuery.data])

    for (let i = 0; i < data.length; i++) {
        dataWithKey.push({
            key: i + 1,
            _id: data[i]._id,
            username: data[i].username,
            fullname: data[i].fullname,
            email: data[i].email,
            group_id: data[i].group_id
        });
    }

    const columns: TableColumnsType<DataType> = [
        {
            title: 'STT',
            dataIndex: 'key',
            rowScope: 'row',

        },
        {
            title: '_id',
            dataIndex: '_id',
            key: '_id',
            hidden: true,
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
    ];

    const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        // console.log("slectedRows", selectedRows);
        setSelectedRowKeys(newSelectedRowKeys);
        let arrayString: string[] = []
        selectedRows.forEach(element => {
            arrayString.push(element._id)
        });
        setSelectedRows(arrayString)
    };

    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
        getCheckboxProps: (record) => ({
            disabled: record.group_id.includes(gid)
        }),
    };

    // data.forEach(element => {
    //     console.log(element.group_id);
    //     element.group_id.forEach(el => {
    //         console.log(el._id.includes(gid));
    //     });
    // });

    const handleOk = () => {
        console.log(selectedRows);
        AddUserToGroupMutation.mutate({ gid, selectedRows }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["users", gid] })
            }
        })
        onOk()
    }

    const AddUserToGroupMutation = useMutation({
        mutationFn: ({ gid, selectedRows }: { gid: string, selectedRows: string[] }) => apiAddUserToGroup({ gid, uid: selectedRows })
    })
    return (
        <ConfigProvider>
            <Modal
                title="Thêm người dùng vào nhóm"
                open={open}
                onOk={handleOk}
                onCancel={onCancel}
                className=" w-[1450px]"
            >
                <Table
                    columns={columns}
                    dataSource={dataWithKey}
                    rowSelection={rowSelection}
                    onChange={onChange}
                    bordered
                />
            </Modal>
        </ConfigProvider>
    )
}

export default ModalAddUsersToGroup