import { FormInstance, Input } from "antd"
import Form, { Rule } from "antd/es/form"
import { FormLayout } from "antd/es/form/Form"
import { Fragment } from "react/jsx-runtime"
import ButtonCustom, { ButtonCustomProps } from "../ButtonCustom/ButtonCustom"


interface FormComponentProps {
    formInstance: FormInstance,
    onFinish?: (value: any) => void
    type?: FormLayout,
    className?: string
    variant?: "outlined" | "borderless" | "filled" | undefined
    data: InputComponentProps[]
    button?: ButtonCustomProps[]
}

export interface InputComponentProps {
    type: string,
    rules?: Rule[],
    name: string,
    label: React.ReactNode,
    placeholder?: string,
    clasName?: string
}

const FormComponent: React.FC<FormComponentProps> = ({ data, formInstance, type, className, variant, button, onFinish }) => {


    const renderInput = (item: InputComponentProps) => {
        switch (item.type) {
            case "text":
                return (
                    <Form.Item
                        name={item.name}
                        label={item.label}
                        rules={item.rules}
                    >
                        <Input placeholder={item.placeholder} className={item.clasName} />
                    </Form.Item>
                );
            case "password":
                return (
                    <Form.Item
                        name={item.name}
                        label={item.label}
                        rules={item.rules}
                    >
                        <Input.Password placeholder={item.placeholder} className={item.clasName} />
                    </Form.Item>
                );
            default:
                return null;
        }
    };

    const renderButton = (item: ButtonCustomProps) => {
        return <ButtonCustom
            nameButton={item.nameButton}
            className={item.className}
            style={item.style}
            disable={item.disable}
            htmlType={item.htmlType}
            icon={item.icon}
            onClick={item.onClick}
            type={item.type}
        />
    }


    return (
        <Form
            form={formInstance}
            onFinish={onFinish}
            layout={type}
            className={className}
            variant={variant}
        >
            {data.map((item, index) => (
                <Fragment key={index}>
                    {renderInput(item)}
                </Fragment>
            ))}
            <div className="flex items-center justify-end w-full gap-2">
                {button && (
                    button.map((item, index) => (
                        <Fragment key={index}>
                            {renderButton(item)}
                        </Fragment>
                    ))
                )}
            </div>
        </Form>
    )
}

export default FormComponent