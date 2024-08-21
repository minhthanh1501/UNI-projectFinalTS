import CommonList from "@/components/commons/CommonList/CommonList"
import FormComponent from "@/components/commons/FormComponent"
import { Form, Table } from "antd"
import ButtonCustom from "@/components/commons/ButtonCustom"
import { ButtonCustomProps } from "@/components/commons/ButtonCustom/ButtonCustom"
import { InputComponentProps } from "@/@types/components.type"


const MainIndustryAndTrade = () => {
    const [form] = Form.useForm()


    const inputData: InputComponentProps[] = [
        {
            label: "a",
            name: "a",
            type: "text"
        },
        {
            label: "b",
            name: "b",
            type: "select"
        }
    ]

    const actions: ButtonCustomProps[] = [
        {
            nameButton: "Tìm kiếm",
            htmlType: "submit",
            type: "primary"
        },
        {
            nameButton: "Làm mới",
            htmlType: "reset",
            type: "dashed",
        }
    ]

    return (
        <CommonList
            title={
                <div>
                    <ButtonCustom nameButton={"làm mới"} type="default" onClick={() => window.location.reload()} />
                </div>
            }
            bordered={false}
            extra={(
                <div className="flex gap-2">
                    <ButtonCustom nameButton={"Thêm"} />
                    <ButtonCustom nameButton={"Xóa"} disable />
                </div>
            )}
        >
            <FormComponent formInstance={form} inputData={inputData} type="vertical" actions={actions} className="mb-5" />
            <Table bordered />
        </CommonList>
    )
}

export default MainIndustryAndTrade