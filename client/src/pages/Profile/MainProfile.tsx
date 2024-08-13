import { ConfigProvider, Tabs, TabsProps } from "antd";
import FormProfile from "./components/FormProfile";
import FormChangePassword from "./components/FormChangePassword";

const MainProfile = () => {

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Thông tin cá nhân',
            children: <FormProfile />,

        },
        {
            key: '2',
            label: 'Đổi mật khẩu',
            children: <FormChangePassword />,

        },
    ];

    return (
        <ConfigProvider
            theme={{
                components: {
                    Tabs: {
                        itemColor: "white"
                    }
                }
            }}
        >
            <div className="bg-secondary p-6">
                <div className="bg-primary">
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </div>
            </div>
        </ConfigProvider>
    )
}

export default MainProfile