import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Modal } from "antd"
import { apiDeleteGroupById } from "../../apis"
import toast from "react-hot-toast"

interface ModalDeleteGroupProps {
    open: boolean,
    onOk: () => void,
    onCancel: () => void,
    gid: string | number
}

const ModalDeleteGroup: React.FC<ModalDeleteGroupProps> = ({ open, onOk, onCancel, gid }) => {
    const queryClient = useQueryClient()

    const DeleteGroupMutation = useMutation({
        mutationFn: (id: string | number) => apiDeleteGroupById(id)
    })

    const handleOk = () => {
        DeleteGroupMutation.mutate(gid, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['groups'] })
                toast.success("Xóa nhóm thành công")
            },
            onError: () => {
                toast.error("Không thành công")
            }
        })
        onOk();
    }

    return (
        <div>
            <Modal title="Xóa nhóm" open={open} onOk={handleOk} onCancel={onCancel} >
                <p>Bạn chắc chắn muốn xóa!</p>
            </Modal>
        </div>
    )
}

export default ModalDeleteGroup