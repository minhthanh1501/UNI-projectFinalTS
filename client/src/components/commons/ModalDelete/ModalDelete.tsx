import { ModalCreateOrUpdateProps } from "@/@types/modal.type"
import { Modal } from "antd"

const ModalDelete: React.FC<ModalCreateOrUpdateProps> = ({ open, onOk, onCancel, id, children }) => {

    const handleOk = () => {

        onOk()
    }

    return (
        <Modal
            title="Chắc chắn xóa ?"
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
        >
            {children}
        </Modal>
    )
}

export default ModalDelete