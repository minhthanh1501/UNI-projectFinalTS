import FormSearch from "./components/FormSearch"
import ListDirectionMenu from "./components/ListDirectionMenu"
import ListMenuPermission from "./components/ListMenuPermission"
import NavHeadList from "./components/ListMenuPermission/NavHeadList"
import NavHead from "./components/NavHead"


const MainPermission = () => {
    return (
        <div>
            <div className="border-b">
                <div className="px-7 py-3">
                    <NavHead />
                </div>
            </div>
            <div className="flex">
                <div className="p-2 w-[30%]">
                    <ListDirectionMenu />
                </div>
                <div className="p-2 w-[70%]">
                    <div className="pb-5">
                        <NavHeadList />
                    </div>
                    <div className="pb-5">
                        <FormSearch />
                    </div>
                    <div className="">
                        <ListMenuPermission />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPermission