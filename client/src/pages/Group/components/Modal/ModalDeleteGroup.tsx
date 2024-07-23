import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Modal } from "antd"
import { apiDeleteGroupById } from "../../apis"

interface ModalDeleteGroupProps {
    open: boolean,
    onOk: () => void,
    onCancel: () => void,
    uid: string | number
}

const ModalDeleteGroup: React.FC<ModalDeleteGroupProps> = ({ open, onOk, onCancel, uid }) => {
    const queryClient = useQueryClient()

    const DeleteGroupMutation = useMutation({
        mutationFn: (id: string | number) => apiDeleteGroupById(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] })
        }

    })

    const handleOk = () => {
        DeleteGroupMutation.mutate(uid)
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