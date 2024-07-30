import FormSearch from "./components/FormSearch"
import ListGroup from "./components/ListGroup"
import ListMenu from "./components/ListMenu"
import NavHead from "./components/NavHead"


const MainPermission = () => {
    return (
        <div>
            <div className="border-b">
                <div className="px-7 py-3">
                    HEAD
                </div>
            </div>
            <div className="flex">
                <div className="p-2 w-[30%]">
                    <ListMenu />
                </div>
                <div className="p-2 w-[70%]">
                    {/* <div className="px-7 py-3 border-b">
                <NavHead />
            </div> */}
                    <div >
                        <FormSearch />
                    </div>
                    {/* <div className="px-7 py-3">
                <ListGroup />
            </div> */}
                </div>
            </div>
        </div>
    )
}

export default MainPermission