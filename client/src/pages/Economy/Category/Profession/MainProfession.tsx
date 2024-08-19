import ButtonCustom, { ButtonCustomProps } from "@/components/commons/ButtonCustom/ButtonCustom"
import CommonList from "@/components/commons/CommonList/CommonList"
import FormComponent from "@/components/commons/FormComponent"
import { InputComponentProps } from "@/components/commons/FormComponent/FormComponent"
import { DeleteFilled } from "@ant-design/icons"
import { Form, Space, Table, TableProps, Tag } from "antd"
import { FaMagnifyingGlass } from "react-icons/fa6";
import { DataType } from "./@types/profession.type"
import { useState } from "react"
import CreateOrUpdateModal from "./components/Modal/CreateOrUpdateModal"


const MainProfession = () => {
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)

    const [form] = Form.useForm()
    const cardTitle = ''

    const onFinish = (value: any) => {
        console.log(value);
    }

    const showModal = () => {
        setOpenCreateOrUpdateModal(true);

    }

    const handleOk = () => {
        setOpenCreateOrUpdateModal(false);
    };

    const handleCancel = () => {
        setOpenCreateOrUpdateModal(false);
    };

    const dataInput: InputComponentProps[] = [
        {
            label: "name",
            name: "name",
            type: "text",
            rules: [{ required: true, message: 'Please input your username!' }],
        },
        {
            label: "age",
            name: "age",
            type: "text",
            // formItemProps: { hidden: true },
            // fieldProps: { disabled: true }
        }
    ]

    const actions: ButtonCustomProps[] = [
        {
            nameButton: "Tìm kiếm",
            style: {
                color: "white",
            },
            htmlType: "submit",
            type: "primary",
            icon: <FaMagnifyingGlass />

        },
        {
            nameButton: "Làm mới",
            style: {
                color: "white",
            },
            htmlType: "reset",
            type: "dashed"
        }
    ]


    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];
    {/* CommonList */ }
    return (

        < CommonList
            title={cardTitle || (
                <div>
                    <ButtonCustom nameButton="làm mới" type="default" onClick={() => (window.location.reload())} />
                </div>
            )
            }
            size="default"
            bordered={false}
            extra={(
                <div className="flex gap-2">
                    <ButtonCustom nameButton="Thêm mới" type="primary" onClick={showModal} />
                    <ButtonCustom nameButton="Xóa" disable type="primary" icon={<DeleteFilled />} />
                </div>
            )}>
            <FormComponent onFinish={onFinish} inputData={dataInput} formInstance={form} type="vertical" actions={actions} className="mb-6" />
            <Table columns={columns} dataSource={data} bordered />
            {openCreateOrUpdateModal ? <CreateOrUpdateModal open={openCreateOrUpdateModal} onCancel={handleCancel} onOk={handleOk} /> : undefined}
        </ CommonList>


    )
}

export default MainProfession