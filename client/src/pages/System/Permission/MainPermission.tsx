import { useQueryParams } from "@/hooks/useQueryParams"
import FormSearch from "./components/FormSearch"
import ListDirectionMenu from "./components/ListDirectionMenu"
import ListMenuPermission from "./components/ListMenuPermission"
import NavHead from "./components/NavHead"
import AddMenu from "./components/AddMenu"


const MainPermission = () => {
    const { code } = useQueryParams()

    const renderPage = () => {
        if (code) {
            return <AddMenu />
        }

        return (
            <>
                <div className="pb-5">
                    <FormSearch />
                </div>
                <div>
                    <ListMenuPermission />
                </div>
            </>
        )
    }

    return (
        <div>
            <div className="border-b">
                <div className="px-6 py-3">
                    <NavHead />
                </div>
            </div>
            <div className="flex">
                <div className="p-2 w-[30%]">
                    <ListDirectionMenu />
                </div>
                <div className="p-2 w-[70%]">
                    <div className="">
                        {renderPage()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPermission