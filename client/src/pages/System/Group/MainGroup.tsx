import FormSearch from "./components/FormSearch"
import ListGroup from "./components/ListGroup"
import NavHead from "./components/NavHead"


const MainGroup = () => {
    return (
        <div>
            <div className="px-7 py-3 border-b">
                <NavHead />
            </div>
            <div className="px-7 py-3">
                <FormSearch />
            </div>
            <div className="px-7 py-3">
                <ListGroup />
            </div>
        </div>
    )
}

export default MainGroup