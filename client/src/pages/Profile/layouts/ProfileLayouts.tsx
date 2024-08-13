import ButtonCustom from "@/components/commons/ButtonCustom"
import { AppContext } from "@/contexts/app.context"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { useContext } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

const ProfileLayouts = () => {
    const navigate = useNavigate()
    const { currentLocation } = useContext(AppContext)

    return (
        <div className='bg-secondary p-6'>
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
            <div className='bg-primary'>
                <Outlet />
            </div>
        </div>
    )
}

export default ProfileLayouts