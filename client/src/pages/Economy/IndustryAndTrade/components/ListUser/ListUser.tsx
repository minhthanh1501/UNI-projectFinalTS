import { DeleteFilled, EditFilled, MoreOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Space, Table, TableColumnsType } from "antd"
import { useState } from "react";

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const ListUser = () => {
    const [pageSize, setPageSize] = useState<number>()
    const dataWithKey: DataType[] = []

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
        },

        {
            title: 'Thao tác',
            dataIndex: "key",
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditFilled />} shape="circle"  ></Button>
                    <Button icon={<DeleteFilled />} danger shape="circle" ></Button>
                    <Button icon={<MoreOutlined />} shape="circle"></Button>
                </Space>
            ),
            width: 150,
            fixed: "right"
        },
    ];

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgContainer: "#141414",
                    colorText: "white",
                    colorTextDescription: "white",
                    colorFillTertiary: "white",
                    colorFill: "white"
                },
                components: {
                    Table: {
                        headerBg: "#1c1c1c",
                        stickyScrollBarBorderRadius: 200
                    }
                }
            }}
        >
            <Table
                rowSelection={rowSelection}
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
                bordered
                columns={columns}
                scroll={{ x: 1500 }}
                sticky
            />
        </ConfigProvider>
    )
}

export default ListUser