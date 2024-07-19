import { ConfigProvider, Form, Input } from "antd"
import ButtonCustom from "../Button/ButtonCustom"
import { ClockCircleOutlined, SearchOutlined } from "@ant-design/icons"


const FormSearch = () => {

    const onSearch = () => {
        console.log("ok")
    }

    return (
        <div>
            <ConfigProvider
                theme={{
                    token: {
                        colorTextBase: "white"
                    },
                }}
            >
                <Form
                    onFinish={onSearch}
                    name="layout-multiple-horizontal"
                    layout="inline"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 20 }}
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "",
                    }}
                    variant="outlined"
                >
                    <Form.Item
                        layout="vertical"
                        label="Email"
                        name="email"
                        style={{
                            width: "48%",

                        }}
                    >
                        <Input style={{ backgroundColor: "transparent" }} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        layout="vertical"
                        label="Họ và tên"
                        name="fullname"
                        style={{ width: "48%" }}
                    >
                        <Input style={{ backgroundColor: "transparent" }} placeholder="Họ và tên" />
                    </Form.Item>
                    <div className="py-3 flex justify-end w-full">
                        <Form.Item >
                            <ButtonCustom
                                icon={<SearchOutlined />}
                                style={{
                                    backgroundColor: "#095cb5",
                                    color: "white",
                                    fontWeight: "500"
                                }}
                                nameButton={"Tìm kiếm"}
                            />
                        </Form.Item>
                        <Form.Item >
                            <ButtonCustom
                                icon={<ClockCircleOutlined />}
                                style={{
                                    color: "white",
                                    backgroundColor: "transparent"
                                }}
                                nameButton={"Làm mới"}
                                type={"dashed"}
                                htmlType="reset"
                            />
                        </Form.Item>
                    </div>
                </Form>
            </ConfigProvider>
        </div>
    )
}

export default FormSearch