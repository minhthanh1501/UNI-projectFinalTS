import { Button } from "antd"

interface ButtonCustomProps {
    icon: React.ReactNode,
    style: React.CSSProperties,
    nameButton: any,
    disable?: boolean
    type?: "primary" | "default" | "dashed" | "text" | "link",
    onClick?: () => void,
    htmlType?: "button" | "submit" | "reset"
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({ icon, style, nameButton, type = "primary", disable = false, onClick, htmlType = "submit" }) => {
    return (
        <Button
            type={type}
            icon={icon}
            style={style}
            disabled={disable}
            onClick={onClick}
            htmlType={htmlType}
        >
            {nameButton}
        </Button>
    )
}

export default ButtonCustom