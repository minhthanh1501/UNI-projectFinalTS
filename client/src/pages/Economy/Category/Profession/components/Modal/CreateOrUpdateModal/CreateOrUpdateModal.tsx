import { Modal } from "antd"
import { ModalCreateOrUpdateProps } from "../../../@types/profession.type"


const CreateOrUpdateModal: React.FC<ModalCreateOrUpdateProps> = ({ onOk, open, onCancel }) => {

    const handleOk = () => {

        onOk()
    }

    return (
        <Modal
            title="ok"
            open={open}
            onCancel={onCancel}
            onOk={handleOk}
        >

        </Modal>
    )
}

export default CreateOrUpdateModal