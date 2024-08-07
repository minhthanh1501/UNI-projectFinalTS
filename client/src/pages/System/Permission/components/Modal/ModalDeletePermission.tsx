import { Modal } from "antd"
import { ModalPermissionProps } from "../../@types/modalprops.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { apiDeleteMenuById } from "../../apis"
import { useQueryParams } from "@/hooks/useQueryParams"
import { getQueryParams } from "@/utils/helpers"


const ModalDeletePermission: React.FC<ModalPermissionProps> = ({ open, onOk, onCancel, mid }) => {
    const queryClient = useQueryClient()
    const { menu_parent_id } = useQueryParams()
    const { name } = getQueryParams()

    const DeletePermissionMutation = useMutation({
        mutationFn: (value: string) => apiDeleteMenuById(value)
    })

    const handleOk = () => {
        DeletePermissionMutation.mutate(mid, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['menus-children', menu_parent_id, name] })
                queryClient.invalidateQueries({ queryKey: ['menus-direction'] })
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