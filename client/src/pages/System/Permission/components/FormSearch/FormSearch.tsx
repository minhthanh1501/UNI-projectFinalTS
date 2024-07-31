import { ConfigProvider, Form, Input } from "antd"
import { ClockCircleOutlined, SearchOutlined } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import ButtonCustom from "@/components/commons/ButtonCustom";



const FormSearch = () => {
    const [form] = Form.useForm();
    const [searchParams, setSearchParams] = useSearchParams()
    const queryClient = useQueryClient()

    if (searchParams.get("name")) {
        form.setFieldValue("name", searchParams.get("name"))
    }

    const setParams = (Obj: any) => {
        const keyArr = Object.keys(Obj);

        keyArr.forEach((key) => {
            if (Obj[key]) {
                searchParams.set(key, Obj[key]);
            } else {
                searchParams.delete(key);
            }
            setSearchParams(searchParams);
            console.log("hehe");
        });
    }
    const handleSubmit = () => {
        let name = form.getFieldValue("name");
        setParams({ name });
        queryClient.invalidateQueries({ queryKey: ["groups", name] })
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
                    form={form}
                    // onFinish={onSearch}
                    name="layout-multiple-horizontal"
                    layout="inline"

                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    variant="outlined"
                >
                    <Form.Item
                        layout="vertical"
                        name="name"
                        style={{
                            width: "98%",

                        }}
                    >
                        <Input style={{ backgroundColor: "transparent" }} placeholder="Nhập từ khóa tìm kiếm(tên, biểu thức...)" />
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
                                htmlType="submit"
                                onClick={handleSubmit}
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