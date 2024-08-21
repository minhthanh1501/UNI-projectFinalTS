import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Modal } from "antd"
import { apiDelete } from "../../../apis"
import { ModalDeleteProps } from "@/@types/components.type"
import toast from "react-hot-toast"
import ButtonCustom from "@/components/commons/ButtonCustom"
import { MdDeleteForever } from "react-icons/md"

const ModalDelete: React.FC<ModalDeleteProps> = ({ open, onOk, onCancel, id }) => {
    const queryclient = useQueryClient()

    const deleteMutation = useMutation({
        mutationFn: () => apiDelete(id),
        onSuccess: (result) => {
            toast.success(result.data.mes)
            queryclient.invalidateQueries({ queryKey: ["professions"] })
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const handleOk = () => {
        deleteMutation.mutate()
        onOk()
    }

    return (
        <Modal
            title={"chắc chắn xóa?"}
            open={open}
            // onOk={handleOk}
            onCancel={onCancel}
            footer={(
                <div className="flex gap-2 justify-end">
                    <ButtonCustom
                        nameButton={"Hủy"}
                        type="default"
                        onClick={onCancel}
                    />
                    <ButtonCustom
                        nameButton={"Xóa"}
                        icon={<MdDeleteForever />}
                        onClick={handleOk}
                        style={{ backgroundColor: "red" }}
                        actionProps={{
                            onMouseEnter: (e) => {
                                e.currentTarget.style.backgroundColor = '#7A0E18';
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.border = 'none';
                            },
                            onMouseLeave: (e) => {
                                e.currentTarget.style.backgroundColor = 'red';
                                e.currentTarget.style.color = 'white';
                            },
                        }}
                    />
                </div>
            )}
        >
            <p>Bạn muốn xóa </p>
        </Modal>
    )
}

export default ModalDelete