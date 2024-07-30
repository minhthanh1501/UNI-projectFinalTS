import { ClockCircleOutlined, CloseCircleOutlined, PlusSquareOutlined } from "@ant-design/icons"
import ButtonCustom from "@/components/commons/ButtonCustom";
import { useState } from "react";
import ModalCreateGroup from "../Modal/ModalCreateGroup";
import { useQueryParams } from "@/hooks/useQueryParams";
import ModalAddUsersToGroup from "../Modal/ModalAddUsersToGroup";



const NavHead = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openModalAddUserToGroup, setOpenModalAddUserToGroup] = useState<boolean>(false)

    const { gid } = useQueryParams()

    const showModal = () => {
        setIsModalOpen(true);
        console.log("show")
    };

    const handleOk = () => {
        setIsModalOpen(false);
        console.log("ok");
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        console.log("cancel");
    };

    // Modal AddUserTogroup
    const showModalAddUserToGroup = () => {
        setOpenModalAddUserToGroup(true)
    }
    const handleOkModalAddUserToGroup = () => {
        setOpenModalAddUserToGroup(false)
    }

    const handleCancelModalAddUserToGroup = () => {
        setOpenModalAddUserToGroup(false)
    }
    return (
        <div className="flex justify-between">
            <div>
                <ButtonCustom
                    icon={<ClockCircleOutlined />}
                    style={{
                        backgroundColor: "transparent",
                        color: "white"
                    }}
                    type={"default"}
                    nameButton={"Làm mới"}
                    htmlType="reset"
                />
            </div>
            <div className="flex gap-3">
                <ButtonCustom
                    icon={<PlusSquareOutlined />}
                    style={{
                        backgroundColor: "#095cb5",
                        color: "white",
                        fontWeight: "500"
                    }}
                    nameButton={gid ? "Thêm thành viên" : "Thêm mới"}
                    onClick={gid ? showModalAddUserToGroup : showModal}
                />
                <ButtonCustom
                    icon={<CloseCircleOutlined />}
                    style={{
                        backgroundColor: "#262626",
                        color: "gray"
                    }}
                    nameButton={"Xóa"}
                    disable={true}
                />
                {/* Modal */}
                {isModalOpen ? (<ModalCreateGroup open={isModalOpen} onOk={handleOk} onCancel={handleCancel} />) : null}
                {gid ? (
                    <ModalAddUsersToGroup open={openModalAddUserToGroup}
                        onOk={handleOkModalAddUserToGroup}
                        onCancel={handleCancelModalAddUserToGroup} gid={gid} />
                ) : null}
            </div>
        </div>
    )
}

export default NavHead