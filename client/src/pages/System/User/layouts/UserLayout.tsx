

import { Outlet, } from 'react-router-dom'

const UserLayout = () => {



    return (
        <div className='bg-secondary p-6 min-h-[100vh]'>

            <div className='bg-primary'>
                <Outlet />
            </div>
        </div>
    )
}

export default UserLayout