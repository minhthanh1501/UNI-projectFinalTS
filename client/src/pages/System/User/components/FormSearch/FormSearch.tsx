import { ConfigProvider, Form, Input } from "antd"
import ButtonCustom from "@/components/commons/ButtonCustom"
import { ClockCircleOutlined, SearchOutlined } from "@ant-design/icons"
import useSearch from "@/hooks/useSearch";


const FormSearch = () => {
    const [form] = Form.useForm();
    // const [searchParams, setSearchParams] = useSearchParams()
    // if (searchParams.get("email")) {
    //     form.setFieldValue("email", searchParams.get("email"))
    // }
    // if (searchParams.get("fullname")) {
    //     form.setFieldValue("fullname", searchParams.get("fullname"))
    // }
    // const setParams = (Obj: any) => {
    //     const keyArr = Object.keys(Obj);

    //     keyArr.forEach((key) => {
    //         if (Obj[key]) {
    //             searchParams.set(key, Obj[key]);
    //         } else {
    //             searchParams.delete(key);
    //         }
    //         setSearchParams(searchParams);
    //         console.log("hehe");
    //     });
    // }
    // const handleSubmit = () => {
    //     let email = form.getFieldValue("email");
    //     let fullname = form.getFieldValue("fullname");
    //     setParams({ email, fullname });
    //     queryClient.invalidateQueries({ queryKey: ["users", email, fullname] })
    // }

    const search = useSearch({
        form,
        keys: ['fullname', 'email'],
        onSuccess: (formValues) => {
            console.log(formValues);
            // const fullname = formValues.fullname;
            // const email = formValues.email;

            // queryClient.invalidateQueries({ queryKey: ["users", fullname, email] });
        }
    })

    const handleSubmit = search?.handleSubmit

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