import { ClockCircleOutlined, CloseCircleOutlined, PlusSquareOutlined } from "@ant-design/icons"
import ButtonCustom from "../Button/ButtonCustom"
import { useState } from "react";
import ModalCreateUser from "../Modal/ModalCreateUser";


const NavHead = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
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
                    nameButton={"Thêm mới"}
                    onClick={showModal}
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
                {isModalOpen ? (<ModalCreateUser open={isModalOpen} onOk={handleOk} onCancel={handleCancel} />) : null}
            </div>
        </div>
    )
}

export default NavHead