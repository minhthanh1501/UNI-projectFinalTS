import { Form, Space, Table, TableProps } from "antd"
import { DataType, FacilityTypes } from "./@types/facilityType.type"
import { useEffect, useState } from "react"
import CommonList from "@/components/commons/CommonList/CommonList"
import FormComponent from "@/components/commons/FormComponent"
import ButtonCustom from "@/components/commons/ButtonCustom"
import { FaEdit, FaTrashAlt } from "react-icons/fa"
import { InputComponentProps } from "@/@types/components.type"
import { ButtonCustomProps } from "@/components/commons/ButtonCustom/ButtonCustom"
import { FaMagnifyingGlass, FaTrash } from "react-icons/fa6"
import { MdAutorenew } from "react-icons/md"
import { useQuery } from "@tanstack/react-query"
import { useQueryParams } from "@/hooks/useQueryParams"
import { apiSearch } from "./apis"
import { PlusCircleFilled } from "@ant-design/icons"
import useSearch from "@/hooks/useSearch"
import ModalCreateOrUpdate from "./components/Modal/ModalCreateOrUpdate"
import ModalDelete from "./components/Modal/ModalDelete"


const MainFacilityType = () => {
    const [form] = Form.useForm()
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
    const [selectId, setSelectId] = useState<string>()
    const dataWithKey: DataType[] = []
    const [data, setData] = useState<FacilityTypes>()
    const { name, field } = useQueryParams()

    const search = useSearch({
        form: form,
        keys: ['name', 'field'],
        onSuccess: (formValues) => {
            console.log(formValues);
        }
    })

    const handleFinish = search?.handleSubmit

    let nameParam = name || undefined
    let fieldParam = field || undefined

    const searchFacilityTypeQuery = useQuery({
        queryKey: ["facilityType", nameParam, fieldParam],
        queryFn: () => apiSearch({ name: nameParam, field: fieldParam })
    })

    useEffect(() => {
        if (searchFacilityTypeQuery.data) {
            setData(searchFacilityTypeQuery.data.data.facilityTypeData)
        }
    }, [searchFacilityTypeQuery.data])

    if (data) {
        for (let i = 0; i < data.length; i++) {
            dataWithKey.push({
                key: i + 1,
                _id: data[i]._id,
                name: data[i].name,
                type: data[i].type == "loai-hinh-san-xuat" ? "Loại hình sản xuất" : "Loại hình kinh doanh",
                field: data[i].field == "nong-nghiep" ? "Nông nghiệp" : "Công thương",
            })

        }
    }


    const showModal = (_id?: string) => {
        setOpenCreateOrUpdateModal(true)
        typeof _id == "string" && setSelectId(_id)
    }

    const handleOk = () => {
        setOpenCreateOrUpdateModal(false)
        setSelectId(undefined)
    }

    const handleCancel = () => {
        setOpenCreateOrUpdateModal(false)
        setSelectId(undefined)
    }

    const showModalDelete = (_id: string) => {
        setOpenDeleteModal(true)
        setSelectId(_id)
    }

    const handleDeleteOk = () => {
        setOpenDeleteModal(false)
        setSelectId(undefined)
    }

    const handleDeleteCancel = () => {
        setOpenDeleteModal(false)
        setSelectId(undefined)
    }

    const inputData: InputComponentProps[] = [
        {
            label: "Tên",
            name: "name",
            type: "text"
        },
        {
            label: "Chọn lĩnh vực",
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
                        label: "Công Thương"
                    },
                ],
                placeholder: "---chọn---"
            }
        }
    ]

    const actions: ButtonCustomProps[] = [
        {
            nameButton: "Tìm kiếm",
            icon: <FaMagnifyingGlass />,
            htmlType: "submit"
        },
        {
            nameButton: "Làm mới",
            icon: <MdAutorenew />,
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
            title: "Tên",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Loại hình",
            dataIndex: "type",
            key: "type"
        },
        {
            title: "Lĩnh vực",
            dataIndex: "field",
            key: "field"
        },
        {
            title: "Thao tác",
            key: "actions",
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
        },
    ]

    return (
        <CommonList
            title={(
                <div>
                    <ButtonCustom nameButton={"Làm mới"} icon={<MdAutorenew />} htmlType="reset" type="default" onClick={() => searchFacilityTypeQuery.refetch()} />
                </div>
            )}
            bordered={false}
            extra={(
                <div className="flex gap-2">
                    <ButtonCustom nameButton={"Thêm mới"} icon={<PlusCircleFilled />} onClick={showModal} />
                    <ButtonCustom nameButton={"Xóa"} icon={<FaTrash />} type="default" disable />
                </div>
            )}
        >
            <FormComponent onFinish={handleFinish} formInstance={form} inputData={inputData} actions={actions} type="vertical" className="mb-6" />
            <Table columns={columns} dataSource={dataWithKey} bordered />
            {(
                openCreateOrUpdateModal ?
                    <ModalCreateOrUpdate
                        open={openCreateOrUpdateModal}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        id={selectId ? selectId : undefined}
                    />
                    : null
            )}
            {(
                openDeleteModal && selectId ?
                    <ModalDelete
                        open={openDeleteModal}
                        onOk={handleDeleteOk}
                        onCancel={handleDeleteCancel}
                        id={selectId}
                    />
                    : null
            )}
        </CommonList>
    )
}

export default MainFacilityType