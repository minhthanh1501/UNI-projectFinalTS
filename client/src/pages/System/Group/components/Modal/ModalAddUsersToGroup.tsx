import { ConfigProvider, Modal, Table, TableColumnsType, TableProps } from "antd"
import { ModalGroupProps } from "../../@types/modalprops.type";
import { useEffect, useState } from "react";
import { Users } from "@/pages/System/User/@types/user.type";
import { apiGetUsers } from "@/pages/System/User/apis";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiAddUserToGroup } from "../../apis";
import FormSearch from "@/pages/System/User/components/FormSearch";
import toast from "react-hot-toast";

interface DataType {
    key: React.Key;
    _id: string;
    username: React.ReactNode;
    fullname: string;
    email: string;
    group_id: { _id: string }
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
            disabled: record.group_id?._id === gid
        }),
    };

    const handleOk = () => {
        console.log(selectedRows);
        AddUserToGroupMutation.mutate({ gid, selectedRows })
        onOk()
    }

    const AddUserToGroupMutation = useMutation({
        mutationFn: ({ gid, selectedRows }: { gid: string, selectedRows: string[] }) => apiAddUserToGroup({ gid, uid: selectedRows }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users", gid] })
            toast.success("Thêm người dùng vào nhóm thành công")
        },
        onError: () => {
            toast.error("Không thành công")
        }

    })
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
                        colorBgContainerDisabled: "gray"
                    },
                }
            }}
        >
            <Modal
                title="Thêm người dùng vào nhóm"
                open={open}
                onOk={handleOk}
                onCancel={onCancel}
                className=" w-[1450px]"
            >
                <FormSearch />
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