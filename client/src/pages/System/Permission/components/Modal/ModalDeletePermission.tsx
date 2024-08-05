import { Modal } from "antd"
import { ModalPermissionProps } from "../../@types/modalprops.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { apiDeleteMenuById } from "../../apis"


const ModalDeletePermission: React.FC<ModalPermissionProps> = ({ open, onOk, onCancel, mid }) => {
    const queryClient = useQueryClient()

    const DeletePermissionMutation = useMutation({
        mutationFn: (value: string) => apiDeleteMenuById(value)
    })

    const handleOk = () => {
        DeletePermissionMutation.mutate(mid, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['menus'] })
                toast.success("Xóa Thành công.")
            }
        })
        onOk()
    }

    return (
        <Modal
            title={"Xóa Permission"}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
        >
            Bạn Chắc chắn xóa?
        </Modal>
    )
}

export default ModalDeletePermission