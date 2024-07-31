import { ClockCircleOutlined, CloseCircleOutlined, PlusSquareOutlined } from "@ant-design/icons"
import ButtonCustom from "@/components/commons/ButtonCustom";
import { useQueryParams } from "@/hooks/useQueryParams";


const NavHeadList = () => {

    const { gid } = useQueryParams()

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
            </div>
        </div>
    )
}

export default NavHeadList