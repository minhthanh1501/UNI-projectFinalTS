import ButtonCustom from "@/components/commons/ButtonCustom"
import { ClockCircleOutlined, SearchOutlined } from "@ant-design/icons"
import { ConfigProvider, Form, Input, Select, SelectProps } from "antd"

const options: SelectProps['options'] = [];

const FormSearch = () => {
    const [form] = Form.useForm();

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const handleChange2 = (value: string) => {
        console.log(`selected ${value}`);
    };

    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorTextHeading: "#c2c2c2",
                    colorTextPlaceholder: "green",
                    colorBgContainer: "transparent",
                    colorText: "white",
                    colorBgElevated: "#333",
                    colorTextQuaternary: "white", // select suffix icon
                    colorTextTertiary: "white" // select suffix icon
                },
                components: {
                    Select: {
                        optionActiveBg: "#1c1c1c",
                        optionSelectedBg: "red",
                        // selectorBg: "red",
                    }
                }
            }}
        >
            <Form
                form={form}
                // onFinish={onSearch}
                name="layout-multiple-horizontal"
                layout="inline"
                variant="outlined"
                className="flex flex-col"
            >
                <div className="flex">
                    <Form.Item
                        layout="vertical"
                        label="Tên cơ sở sản xuất kinh doanh thực phẩm"
                        name="name"
                        className="flex-1"
                    >
                        <Input style={{ backgroundColor: "transparent" }} placeholder="Tên cơ sở sản xuất kinh doanh thực phẩm" />
                    </Form.Item>
                    <Form.Item
                        layout="vertical"
                        label="Tên chủ"
                        name="owner_name"
                        className="flex-1"
                    >
                        <Input style={{ backgroundColor: "transparent" }} placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                        layout="vertical"
                        label="Số điện thoại"
                        name="phone"
                        className="flex-1"
                    >
                        <Input style={{ backgroundColor: "transparent" }} placeholder="Name" />
                    </Form.Item>
                </div>
                <div className="flex">
                    <Form.Item
                        layout="vertical"
                        label="CMND/CCCD/Hộ chiếu"
                        name="personal_document"
                        className="flex-1"
                    >
                        <Input style={{ backgroundColor: "transparent" }} placeholder="Name" />
                    </Form.Item>
                    <Form.Item
                        layout="vertical"
                        label="Quận/Huyện/TP"
                        name="city"
                        className="flex-1"
                    >
                        <Select
                            showSearch
                            placeholder="---Chọn---"
                            style={{ width: '100%' }}
                            allowClear={true}
                            onChange={handleChange}
                            options={options}
                        />
                    </Form.Item>
                    <Form.Item
                        layout="vertical"
                        label="Xã/Phường/Thị Trấn"
                        name="ward"
                        className="flex-1"
                    >
                        <Select
                            showSearch
                            allowClear={true}
                            placeholder="---Chọn---"
                            style={{ width: '100%' }}
                            onChange={handleChange2}
                            options={options}
                        />
                    </Form.Item>
                </div>
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
                            type="default"
                            // onClick={handleSubmit}
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
    )
}

export default FormSearch