import ButtonCustom from "@/components/commons/ButtonCustom"
import { AppContext } from "@/contexts/app.context"
import { useQueryParams } from "@/hooks/useQueryParams"
import { ClockCircleOutlined, CloseCircleOutlined, FolderOpenTwoTone, LeftOutlined, PlusSquareOutlined } from "@ant-design/icons"
import { Button, ConfigProvider, Breadcrumb } from "antd"
import { ItemType } from "antd/es/breadcrumb/Breadcrumb"
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"


const NavHead = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { breadcrumbItem } = useContext(AppContext)

    const { menu_parent_id, code } = useQueryParams()

    const [addMode, setAddMode] = useState<boolean>(false)

    useEffect(() => {
        if (code) {
            setAddMode(true)
        } else {
            setAddMode(false)
        }
    }, [code])

    const handleOnClickAddMenu = () => {
        setAddMode(true)
        if (menu_parent_id) {
            navigate(`${location.pathname}${location.search}&code=themmoi`)
        } else {
            navigate(`${location.pathname}?menu_parent_id=null&code=themmoi`)
        }

    }

    const handleOnClickBack = () => {
        setAddMode(false)
        navigate(-1)
    }

    const items: ItemType[] = [
        {
            type: 'separator',
            separator: <FolderOpenTwoTone twoToneColor={['#f1a905', '#f1a905']} />,
        },
    ]

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
                <div className="flex w-[30%] justify-start">
                    <Breadcrumb
                        separator=">"
                        items={breadcrumbItem}
                    />
                </div>
                {addMode ? (
                    <div className="flex w-[70%] justify-end">
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