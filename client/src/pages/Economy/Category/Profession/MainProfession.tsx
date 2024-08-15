import ButtonCustom, { ButtonCustomProps } from "@/components/commons/ButtonCustom/ButtonCustom"
import CardComponent from "@/components/commons/CardComponent"
import FormComponent from "@/components/commons/FormComponent"
import { InputComponentProps } from "@/components/commons/FormComponent/FormComponent"
import { ConfigProvider, Form, Space, Table, TableProps, Tag } from "antd"
import { Fragment } from "react/jsx-runtime"


const MainProfession = () => {
    const [form] = Form.useForm()
    const cardTitle = ''

    const onFinish = (value: any) => {
        console.log(value);
    }

    const dataInput: InputComponentProps[] = [
        {
            label: "name",
            name: "name",
            type: "text",
            rules: [{ required: true, message: 'Please input your username!' }]
        },
        {
            label: "age",
            name: "age",
            type: "text"
        }
    ]

    const button: ButtonCustomProps[] = [
        {
            nameButton: "Thêm",
            style: {
                color: "white",
                backgroundColor: "red"
            },
            htmlType: "submit",
            type: "default"
        },
        {
            nameButton: "Thêm",
            style: {
                color: "white",

            },
            htmlType: "reset",
            type: "default"
        }
    ]


    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
    }

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

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgContainer: "transparent",
                    colorText: "white",
                    colorBorder: "#222222",
                    colorBgBase: "#141414",
                },
                components: {
                    Table: {
                        headerBg: "#1d1d1d",
                        borderColor: "#333"
                    },
                }
            }}
        >
            <CardComponent
                title={cardTitle || (
                    <Fragment>
                        <ButtonCustom nameButton="làm mới" type="default" onClick={() => console.log("1")} />
                    </Fragment>
                )}
                extra={(
                    <Fragment>
                        <ButtonCustom nameButton="Lưu" />
                        <ButtonCustom nameButton="Xóa" />
                    </Fragment>
                )}>
                <FormComponent onFinish={onFinish} data={dataInput} formInstance={form} type="vertical" button={button} />
                <Table columns={columns} dataSource={data} bordered />
            </CardComponent>

        </ConfigProvider>


    )
}

export default MainProfession