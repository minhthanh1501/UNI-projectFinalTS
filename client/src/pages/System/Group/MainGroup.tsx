import FormSearch from "./components/FormSearch"
import ListGroup from "./components/ListGroup"
import NavHead from "./components/NavHead"
import MembersGroup from "./components/MembersGroup"
import { useQueryParams } from "@/hooks/useQueryParams"
import ListMenu from "./components/ListMenu"

const MainGroup = () => {
    const { gid, code } = useQueryParams();

    const renderPage = () => {
        if (code && gid) {
            return <ListMenu />
        }

        if (gid && !code) {
            return <MembersGroup />
        }
    }

    return (
        <div>
            <div className="px-7 py-3 border-b">
                <NavHead />
            </div>
            {!gid && (
                <>
                    <div className="px-7 py-3">
                        <FormSearch />
                    </div>
                    <div className="px-7 py-3">
                        <ListGroup />
                    </div>
                </>
            )}
            <div className="px-7 py-3">
                {renderPage()}
            </div>
        </div>
    )
}

export default MainGroup