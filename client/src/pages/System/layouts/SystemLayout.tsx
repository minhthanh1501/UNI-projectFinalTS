
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Outlet, useNavigate } from 'react-router-dom'
import ButtonCustom from '@/components/commons/ButtonCustom'
import { useContext } from 'react'
import { AppContext } from '@/contexts/app.context'
const SystemLayout = () => {
    const navigate = useNavigate()
    const { currentLocation } = useContext(AppContext)

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
            <div className='bg-primary'>
                <Outlet />
            </div>
        </div>
    )
}

export default SystemLayout