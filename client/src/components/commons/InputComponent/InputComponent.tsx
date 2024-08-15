import { Input } from "antd"
import React from "react"


interface InputCompoentProps {
    allowClear: boolean,
    prefix: React.ReactNode,
    variant: "outlined" | "borderless" | "filled",

}

const InputComponent: React.FC<InputCompoentProps> = () => {
    return (
        <Input />
    )
}

export default InputComponent