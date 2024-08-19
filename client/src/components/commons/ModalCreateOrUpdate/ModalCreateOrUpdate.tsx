import { ModalCreateOrUpdateProps } from "@/@types/modal.type"
import { Modal } from "antd"

const ModalCreateOrUpdate: React.FC<ModalCreateOrUpdateProps> = ({ open, onOk, onCancel, id, children }) => {

    const handleOk = () => {

        onOk()
    }

    return (
        <Modal
            title={id ? "Thêm" : "Cập nhật"}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
        >
            {children}
        </Modal>
    )
}

export default ModalCreateOrUpdate