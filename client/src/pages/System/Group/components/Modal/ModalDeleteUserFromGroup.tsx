import { ConfigProvider, Modal } from "antd"
import { ModalGroupProps } from "../../@types/modalprops.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiDeleteUserFromGroup } from "../../apis"
import toast from "react-hot-toast"


const ModalDeleteUserFromGroup: React.FC<ModalGroupProps> = ({ open, onOk, onCancel, gid, uid }) => {
    const queryClient = useQueryClient()

    const DeleteUserFromGroupMutaion = useMutation({
        mutationFn: () => apiDeleteUserFromGroup({ gid, uid })
    })

    const handleOk = () => {
        DeleteUserFromGroupMutaion.mutate(undefined, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["users", gid] })
                toast.success("Xóa người dùng khỏi nhóm thành công!",)
            },
            onError: () => {
                toast.error("Không thành công",)
            }
        })
        onOk()
    }

    return (
        <ConfigProvider>
            <Modal
                title="Xóa User khỏi Group"
                open={open}
                onOk={handleOk}
                onCancel={onCancel}
            >
                <p>Bạn chắc chắn muốn xóa?</p>
            </Modal>
        </ConfigProvider>
    )
}

export default ModalDeleteUserFromGroup