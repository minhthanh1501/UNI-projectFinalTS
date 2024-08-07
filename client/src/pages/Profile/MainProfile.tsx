import { Tabs, TabsProps } from "antd";
import FormProfile from "./components/FormProfile";
import FormChangePassword from "./components/FormChangePassword";

const MainProfile = () => {

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Tab 1',
            children: <FormProfile />,
        },
        {
            key: '2',
            label: 'Tab 2',
            children: <FormChangePassword />,
        },
    ];

    return (
        <div className="bg-secondary p-6">
            <div className="bg-primary">
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
        </div>
    )
}

export default MainProfile