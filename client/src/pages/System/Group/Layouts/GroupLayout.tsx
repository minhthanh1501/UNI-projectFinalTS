

import { Outlet } from "react-router-dom"


const GroupLayout = () => {

    return (
        <div className='bg-secondary p-6'>
            <div className='bg-primary'>
                <Outlet />
            </div>
        </div>
    )
}

export default GroupLayout