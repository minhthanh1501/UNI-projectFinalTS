import FormSearch from "./components/FormSearch"
import ListGroup from "./components/ListGroup"
import NavHead from "./components/NavHead"
import MembersGroup from "./components/MembersGroup"
import { useQueryParams } from "@/hooks/useQueryParams"
import ListMenu from "./components/ListMenu"

const MainGroup = () => {
    const { gid, code } = useQueryParams();

    return (
        <div>
            <div className="px-7 py-3 border-b">
                <NavHead />
            </div>
            {!gid && (
                <div className="px-7 py-3">
                    <FormSearch />
                </div>
            )}
            {!gid ? (
                <div className="px-7 py-3">
                    <ListGroup />
                </div>
            ) : (
                <div className="px-7 py-3">
                    {code ? <ListMenu /> : <MembersGroup />}
                </div>
            )}
        </div>
    )
}

export default MainGroup