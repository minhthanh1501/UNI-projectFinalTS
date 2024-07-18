
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Outlet, useLocation } from 'react-router-dom'
import ButtonCustom from '../components/Button/ButtonCustom'
const UserLayout = () => {
    const location = useLocation()
    const pathname = location.pathname;
    const pathSegments = pathname.split('/').filter(segment => segment);
    const lastSegment = pathSegments[pathSegments.length - 1];


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
                />
                <h1 className='text-white font-bold text-xl'>{lastSegment}</h1>
            </div>
            <div className='bg-primary'>
                <Outlet />
            </div>
        </div>
    )
}

export default UserLayout