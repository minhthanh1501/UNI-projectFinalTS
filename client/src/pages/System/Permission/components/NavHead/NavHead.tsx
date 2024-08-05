import ButtonCustom from "@/components/commons/ButtonCustom"
import { useQueryParams } from "@/hooks/useQueryParams"
import { ClockCircleOutlined, CloseCircleOutlined, FolderOpenTwoTone, LeftOutlined, PlusSquareOutlined } from "@ant-design/icons"
import { Button, ConfigProvider, Breadcrumb } from "antd"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"


const NavHead = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { code } = useQueryParams()

    const [addMode, setAddMode] = useState<boolean>(false)

    useEffect(() => {
        if (code) {
            setAddMode(true)
        }
    }, [code])

    const handleOnClickAddMenu = () => {
        setAddMode(true)
        navigate(`${location.pathname}${location.search}&code=themmoi`)
    }

    const handleOnClickBack = () => {
        setAddMode(false)
        navigate(-1)
    }

    return (
        <ConfigProvider
            theme={{
                token: {

                },
                components: {
                    Button: {
                        colorBgContainer: "transparent",
                        colorText: "white"
                    },
                    Breadcrumb: {
                        colorText: "white",
                        colorTextDescription: "white"
                    }
                }
            }}
        >
            <div className="flex justify-between">
                <div>
                    <Breadcrumb
                        separator=">"
                        items={[
                            {
                                type: 'separator',
                                separator: <FolderOpenTwoTone twoToneColor={['#f1a905', '#f1a905']} />,

                            },
                            {
                                title: 'Home',
                            },
                            {
                                title: 'Application Center',
                            },
                            {
                                title: 'Application List',
                            },
                        ]}
                    />
                </div>
                {addMode ? (
                    <div>
                        <Button
                            icon={<LeftOutlined />}
                            onClick={handleOnClickBack}
                        >
                            Quay lại
                        </Button>
                    </div>
                ) : (
                    <div className="flex w-[70%] justify-between">
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
                                onClick={handleOnClickAddMenu}
                                nameButton={"Thêm mới"}
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
            </div>
        </ConfigProvider>
    )
}

export default NavHead