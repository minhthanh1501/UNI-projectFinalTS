import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Modal } from "antd"
import { apiDeleteUserById } from "../../apis"

interface ModalDeleteProps {
    open: boolean,
    onOk: () => void,
    onCancel: () => void,
    uid: string | number
}

const ModalDeleteUser: React.FC<ModalDeleteProps> = ({ open, onOk, onCancel, uid }) => {
    const queryClient = useQueryClient()

    const DeleteUserMutation = useMutation({
        mutationFn: (id: string | number) => apiDeleteUserById(id)
    })

    const handleOk = () => {
        DeleteUserMutation.mutate(uid, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['users'] })
            }
        })

        onOk();
    }

    return (
        <div>
            <Modal title="Xóa người dùng" open={open} onOk={handleOk} onCancel={onCancel} >
                <p>Bạn chắc chắn muốn xóa!</p>
            </Modal>
        </div>
    )
}

export default ModalDeleteUser