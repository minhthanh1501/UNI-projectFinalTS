import { ModalCreateOrUpdateProps } from "@/@types/modal.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Form, Input, Modal, Select, SelectProps } from "antd"
import { apiCreateOrUpdate, apiGetDetail } from "../../../apis"
import { Profession } from "../../../@types/profession.type"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { FacilityTypes } from "@/pages/Economy/Category/FacilityType/@types/facilityType.type"
import { apiSearch } from "@/pages/Economy/Category/FacilityType/apis"

const ModalCreateOrUpdate: React.FC<ModalCreateOrUpdateProps> = ({ open, onOk, onCancel, id }) => {
    const [facilityTypeData, setFacilityTypeData] = useState<FacilityTypes>()
    const [data, setData] = useState<Profession>()
    const [optionValue, setOptionValue] = useState<string>()
    const [form] = Form.useForm()
    const [addMode, setAddMode] = useState<boolean>(true)
    const queryclient = useQueryClient()
    const options: SelectProps['options'] = []

    useEffect(() => {
        id ? setAddMode(false) : setAddMode(true)
    }, [id]);

    const handleChange = (value: string) => {
        setOptionValue(value)
        form.setFieldValue("parent_id", undefined)
    }

    const getFacilityTypeQuery = useQuery({
        queryKey: ['facilityTypes', optionValue],
        queryFn: () => apiSearch({ field: optionValue }),
        enabled: Boolean(optionValue),
    })

    useEffect(() => {
        if (getFacilityTypeQuery.data) {
            setFacilityTypeData(getFacilityTypeQuery.data.data.facilityTypeData)

        }
    }, [getFacilityTypeQuery.data])

    if (facilityTypeData) {
        for (let i = 0; i < facilityTypeData.length; i++) {
            options.push({
                value: facilityTypeData[i]._id,
                label: facilityTypeData[i].name
            })

        }
    }

    const getDetailQuery = useQuery({
        queryKey: ['detail-profession', id],
        queryFn: () => apiGetDetail(id),
        enabled: Boolean(id)
    })

    useEffect(() => {
        if (getDetailQuery.data) setData(getDetailQuery.data.data.professionData)
        if (data) {
            form.setFieldsValue({
                _id: data._id,
                field: data.field,
                parent_id: data.parent_id._id,
                code: data.code,
                name: data.name
            })
            setOptionValue(data.field)
        }

    }, [getDetailQuery.data, data])




    const createOrUpdateProfessionMutation = useMutation({
        mutationFn: (value: Profession) => apiCreateOrUpdate(value),
        onSuccess: (result) => {
            toast.success(result.data.mes)
            queryclient.invalidateQueries({ queryKey: ["professions"] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleOk = () => {
        form.submit()
    }

    const handleSubmit = (value: Profession) => {
        createOrUpdateProfessionMutation.mutate(value)
        onOk()
    }


    return (
        <Modal
            title={addMode ? "Thêm" : "Cập nhật"}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            className="w-[1000px]"
        >
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                className="flex gap-5 w-full"
            >
                <Form.Item
                    label="_id"
                    name="_id"
                    className="hidden"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Lĩnh vực"
                    name="field"
                    rules={[{ required: true, message: "vui lòng nhập lĩnh vực" }]}
                    className="w-[23%]"
                >
                    <Select
                        placeholder="----chọn----"
                        allowClear
                        showSearch
                        options={
                            [
                                {
                                    value: "nong-nghiep", label: "Nông nghiệp"
                                },
                                {
                                    value: "cong-thuong", label: "Công thương"
                                },
                            ]
                        }
                        onChange={handleChange}
                    />
                </Form.Item>
                <Form.Item
                    label="Ngành nghề cha"
                    name="parent_id"
                    className="w-[23%]"
                >
                    <Select
                        allowClear
                        showSearch
                        placeholder="----chọn----"
                        disabled={optionValue || data ? false : true}
                        options={optionValue ? options : []}
                    />
                </Form.Item>
                <Form.Item
                    label="Mã ngành nghề"
                    name="code"
                    rules={[{ required: true, message: "vui lòng nhập mã ngành nghề" }]}
                    className="w-[23%]"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tên ngành nghề"
                    name="name"
                    rules={[{ required: true, message: "vui lòng nhập Tên ngành nghề" }]}
                    className="w-[23%]"
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default ModalCreateOrUpdate