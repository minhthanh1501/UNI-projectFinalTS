import { Button, ButtonProps } from "antd"

export interface ButtonCustomProps {
    icon?: React.ReactNode,
    style?: React.CSSProperties,
    nameButton?: any,
    disable?: boolean
    type?: "primary" | "default" | "dashed" | "text" | "link",
    onClick?: () => void,
    htmlType?: "button" | "submit" | "reset"
    className?: string
    actionProps?: ButtonProps
}

const ButtonCustom: React.FC<ButtonCustomProps> = ({ icon, style, nameButton, type = "primary", disable = false, onClick, htmlType = "submit", className, actionProps }) => {
    return (
        <Button
            type={type}
            icon={icon}
            style={style}
            disabled={disable}
            onClick={onClick}
            htmlType={htmlType}
            className={className}
            {...actionProps}
        >
            {nameButton}
        </Button>
    )
}

export default ButtonCustom