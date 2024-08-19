import ButtonCustom from "@/components/commons/ButtonCustom";
import { useApp } from "@/contexts/app.context";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";


const EconomyLayout = () => {
    const navigate = useNavigate()
    const { currentLocation } = useApp()
    return (
        <div className='bg-secondary p-6 min-h-[100vh]'>
            <div className='flex'>
                <ButtonCustom
                    icon={<ArrowLeftOutlined />}
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#165996",
                    }}
                    type='default'
                    nameButton={""}
                    onClick={() => navigate(-1)}
                />
                <h1 className='text-white font-bold text-xl'>{currentLocation}</h1>
            </div>
            <div className="p-6">
                <Outlet />
            </div>
        </div>
    )
}

export default EconomyLayout