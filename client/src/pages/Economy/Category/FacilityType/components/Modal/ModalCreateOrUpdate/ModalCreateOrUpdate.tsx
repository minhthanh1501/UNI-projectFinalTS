import { InputComponentProps, ModalCreateOrUpdateProps } from "@/@types/components.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Form, Input, Modal, Select } from "antd"
import { useEffect, useState } from "react"
import { apiCreateOrUpdate, apiGetDetail } from "../../../apis"
import { FacilityType } from "../../../@types/facilityType.type"
import toast from "react-hot-toast"

const ModalCreateOrUpdate: React.FC<ModalCreateOrUpdateProps> = ({ onOk, open, onCancel, id }) => {
    const [addMode, setAddMode] = useState<boolean>(true)
    const [data, setData] = useState<FacilityType>()
    const [form] = Form.useForm()
    const queryclient = useQueryClient()



    useEffect(() => {
        id ? setAddMode(false) : setAddMode(true)
    }, [id])

    const getDetailQuery = useQuery({
        queryKey: ['detail-facilityType', id],
        queryFn: () => apiGetDetail(id),
        enabled: Boolean(id)
    })

    useEffect(() => {
        if (getDetailQuery.data) {
            setData(getDetailQuery.data.data.facilityTypeData)
        }
    }, [getDetailQuery.data])

    if (data) {
        form.setFieldsValue({
            _id: data._id,
            code: data.code,
            name: data.name,
            type: data.type,
            field: data.field,
            note: data.note
        })
    }


    const createOrUpdateFacilityTypeMutation = useMutation({
        mutationFn: (value: FacilityType) => apiCreateOrUpdate(value),
        onSuccess: (result) => {
            queryclient.invalidateQueries({ queryKey: ["facilityType"] })
            toast.success(result.data.mes)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleSubmit = (value: FacilityType) => {
        createOrUpdateFacilityTypeMutation.mutate(value)
        onOk()
    }

    const handleOk = () => {
        form.submit()
    }


    const renderInput = (item: InputComponentProps) => {
        switch (item.type) {
            case "text":
                return (
                    <Form.Item
                        label={item.label}
                        name={item.name}
                        rules={item.rules}
                        className={item.className}
                        {...item.formItemProps}
                    >
                        <Input placeholder={item.placeholder} {...item.fieldProps} />
                    </Form.Item>
                );
            case "textarea":
                return (
                    <Form.Item
                        label={item.label}
                        name={item.name}
                        rules={item.rules}
                        className={item.className}
                        {...item.formItemProps}
                    >
                        <Input.TextArea placeholder={item.placeholder} {...item.fieldAreaProps} />
                    </Form.Item>
                );
            case "select":
                return (
                    <Form.Item
                        label={item.label}
                        name={item.name}
                        rules={item.rules}
                        className={item.className}
                        {...item.formItemProps}
                    >
                        <Select
                            allowClear
                            showSearch
                            placeholder={item.placeholder}
                            {...item.selectProps}
                        />
                    </Form.Item>
                );
            default:
                return null
        }
    }

    const inputData: InputComponentProps[] = [
        {
            label: "_id",
            name: "_id",
            type: "text",
            fieldProps: {
                disabled: true
            },
            formItemProps: {
                hidden: true
            }
        },
        {
            label: "Mã loại hình",
            name: "code",
            placeholder: "Mã loại hình",
            type: "text",
            rules: [{ required: true, message: "Vui lòng nhập mã" }],
            className: "w-[24%]"
        },
        {
            label: "Tên",
            name: "name",
            placeholder: "Tên",
            type: "text",
            rules: [{ required: true, message: "Vui lòng nhập tên" }],
            className: "w-[24%]"
        },
        {
            label: "Loại hình",
            name: "type",
            placeholder: "Mã loại hình",
            type: "select",
            rules: [{ required: true, message: "Vui lòng chọn loại hình" }],
            className: "w-[24%]",
            selectProps: {
                options: [
                    {
                        value: "loai-hinh-san-xuat",
                        label: "Loại hình sản xuất"
                    },
                    {
                        value: "loai-hinh-kinh-doanh",
                        label: "Loại hình kinh doanh"
                    }
                ]
            }
        },
        {
            label: "Lĩnh vực",
            name: "field",
            placeholder: "---chọn---",
            type: "select",
            rules: [{ required: true, message: "Vui lòng chọn lĩnh vực" }],
            className: "w-[24%]",
            selectProps: {
                options: [
                    {
                        value: "nong-nghiep",
                        label: "Nông nghiêp"
                    },
                    {
                        value: "cong-thuong",
                        label: "Công thương"
                    }
                ]
            }
        },
        {
            label: "Thuộc loại cơ sở",
            name: "coso",
            placeholder: "---chọn---",
            type: "select",
            className: "w-[49%]"
        },
        {
            label: "Ghi chú",
            name: "note",
            placeholder: "Ghi chú",
            type: "textarea",
            className: "w-[49%]"
        },
    ]

    return (
        <Modal
            title={addMode ? "Thêm" : "Cập nhật"}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            width={1000}
        >
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                className="flex flex-wrap gap-2"
            >
                {
                    inputData.map((item) => (
                        renderInput(item)
                    ))
                }
            </Form>
        </Modal>
    )
}

export default ModalCreateOrUpdate