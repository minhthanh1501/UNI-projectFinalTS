import ButtonCustom from "@/components/commons/ButtonCustom"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

const ProfileLayouts = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const pathname = location.pathname;
    const pathSegments = pathname.split('/').filter(segment => segment);
    const lastSegment = pathSegments[pathSegments.length - 1];

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
                <h1 className='text-white font-bold text-xl'>{lastSegment}</h1>
            </div>
            <div className='bg-primary'>
                <Outlet />
            </div>
        </div>
    )
}

export default ProfileLayouts