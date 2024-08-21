import ButtonCustom, { ButtonCustomProps } from "@/components/commons/ButtonCustom/ButtonCustom"
import CommonList from "@/components/commons/CommonList/CommonList"
import FormComponent from "@/components/commons/FormComponent"
import { DeleteFilled } from "@ant-design/icons"
import { Form, Space, Table, TableProps } from "antd"
import { FaMagnifyingGlass } from "react-icons/fa6";
import { DataType, Professions } from "./@types/profession.type"
import { useEffect, useState } from "react"
import ModalCreateOrUpdate from "@/pages/Economy/Category/Profession/components/Modal/ModalCreateOrUpdate"
import { useQuery } from "@tanstack/react-query"
import { apiSearch } from "./apis"
import { FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import withRouter from "@/hocs/withRouter"
import { NavigateFunction } from "react-router-dom"
import useSearch from "@/hooks/useSearch"
import { InputComponentProps } from "@/@types/components.type"
import { useQueryParams } from "@/hooks/useQueryParams"
import ModalDelete from "./components/Modal/ModalDelete"

interface MainProfessionProps {
    navigate: NavigateFunction,
    location: Location
}

const MainProfession: React.FC<MainProfessionProps> = () => {
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const [selectId, setSelectId] = useState<string | undefined>(undefined)
    const [professionData, setProfessionData] = useState<Professions>()
    let dataWithKey: DataType[] = [];

    const [form] = Form.useForm()
    const { name, field } = useQueryParams()
    const cardTitle = ''

    const search = useSearch({
        form: form,
        keys: ['name', 'field'],
    })

    const handleFinish = search?.handleSubmit



    const showModal = (_id?: string) => {
        setOpenCreateOrUpdateModal(true);
        typeof _id == "string" && setSelectId(_id)
    }

    const handleOk = () => {
        setOpenCreateOrUpdateModal(false);
        setSelectId(undefined)
    };

    const handleCancel = () => {
        setOpenCreateOrUpdateModal(false);
        setSelectId(undefined)
    };

    let nameParams = name || undefined
    let fieldParams = field || undefined

    const searchProfessionQuery = useQuery({
        queryKey: ['professions', nameParams, fieldParams],
        queryFn: () => apiSearch({ name: nameParams, field: fieldParams })
    })

    useEffect(() => {
        if (searchProfessionQuery.data) {
            setProfessionData(searchProfessionQuery.data.data.professionData)
        }
    }, [searchProfessionQuery.data])

    if (professionData) {
        for (let i = 0; i < professionData.length; i++) {
            dataWithKey.push({
                key: i + 1,
                _id: professionData[i]._id,
                name: professionData[i].name,
                field: professionData[i].field == "nong-nghiep" ? "Nông nghiệp" : "Công thương"
            })
        }
    }

    const showModalDelete = (_id: string) => {
        setOpenDeleteModal(true)
        setSelectId(_id)
    }

    const handleDeleteOk = () => {
        setOpenDeleteModal(false);
        setSelectId(undefined)
    };

    const handleDeleteCancel = () => {
        setOpenDeleteModal(false);
        setSelectId(undefined)
    };

    const dataInput: InputComponentProps[] = [
        {
            label: "Tên ngành nghề",
            name: "name",
            type: "text",
            placeholder: "Tên ngành nghề",

        },
        {
            label: "Lĩnh vực",
            name: "field",
            type: "select",
            selectProps: {
                options: [
                    {
                        value: "nong-nghiep",
                        label: "Nông nghiệp"
                    },
                    {
                        value: "cong-thuong",
                        label: "Công thương"
                    }
                ],
            }

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
            title: "STT",
            dataIndex: "key",
            rowScope: "row"
        },
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Lĩnh vực',
            dataIndex: 'field',
            key: 'field',
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (_, record) => (
                <Space size="small">
                    <ButtonCustom
                        icon={<FaEdit size={16} />}
                        onClick={() => showModal(record._id)}
                        type="default"
                        style={{
                            backgroundColor: "#0099FF",
                        }}
                        actionProps={{
                            onMouseEnter: (e) => {
                                e.currentTarget.style.backgroundColor = '#0854A4';
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.border = 'none';
                            },
                            onMouseLeave: (e) => {
                                e.currentTarget.style.backgroundColor = '#1890ff';
                                e.currentTarget.style.color = 'white';
                            },
                            title: "Cập nhật",
                            shape: "circle"
                        }}
                    />
                    <ButtonCustom
                        icon={<FaTrashAlt size={16} />}
                        onClick={() => showModalDelete(record._id)}
                        type="default"
                        style={{
                            backgroundColor: "red",
                            border: "no-underline"
                        }}
                        actionProps={{
                            onMouseEnter: (e) => {
                                e.currentTarget.style.backgroundColor = '#7A0E18';
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.border = 'none';
                            },
                            onMouseLeave: (e) => {
                                e.currentTarget.style.backgroundColor = 'red';
                                e.currentTarget.style.color = 'white';
                            },
                            title: "Xóa",
                            shape: "circle"
                        }}
                    />
                </Space>
            ),
            width: 200,
        },
    ];


    {/* CommonList */ }
    return (

        <CommonList
            title={cardTitle || (
                <div>
                    <ButtonCustom nameButton="làm mới" type="default" onClick={() => (searchProfessionQuery.refetch())} />
                </div>
            )
            }
            size="default"
            bordered={false}
            extra={(
                <div className="flex gap-2">
                    <ButtonCustom nameButton="Thêm mới" type="primary" onClick={showModal} icon={<FaPlusCircle />} />
                    <ButtonCustom nameButton="Xóa" disable type="primary" icon={<DeleteFilled />} />
                </div>
            )}>
            <FormComponent
                onFinish={handleFinish}
                inputData={dataInput}
                formInstance={form}
                type="vertical"
                actions={actions}
                className="mb-6"
            />
            <Table
                columns={columns}
                dataSource={dataWithKey}
                // rowSelection={}
                bordered
            />
            {openCreateOrUpdateModal ?
                (
                    <ModalCreateOrUpdate
                        open={openCreateOrUpdateModal}
                        onCancel={handleCancel}
                        onOk={handleOk}
                        id={selectId ? selectId : undefined}
                    />
                )
                : undefined}
            {openDeleteModal && selectId ?
                (
                    <ModalDelete
                        open={openDeleteModal}
                        onCancel={handleDeleteCancel}
                        onOk={handleDeleteOk}
                        id={selectId}
                    />
                )
                : undefined}
        </CommonList>


    )
}

export default withRouter(MainProfession)