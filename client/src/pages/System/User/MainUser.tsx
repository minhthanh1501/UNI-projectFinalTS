import ListUser from "./components/ListUser";
import FormSearch from "./components/FormSearch";
import NavHead from "./components/NavHead";


const MainUser = () => {


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

export default MainUser