import FormSearch from "./components/FormSearch"
import ListUser from "./components/ListUser"
import NavHead from "./components/NavHead"


const MainIndustryAndTrade = () => {
    return (
        <div>
            <div className="px-7 py-3 border-b">
                <NavHead />
            </div>
            <div className="px-7 py-3">
                <FormSearch />
            </div>
            <div className="px-7 py-3">
                <ListUser />
            </div>
        </div>
    )
}

export default MainIndustryAndTrade