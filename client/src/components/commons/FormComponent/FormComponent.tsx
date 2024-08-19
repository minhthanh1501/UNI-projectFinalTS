import { FormInstance, Input, InputProps } from "antd"
import Form, { FormItemProps, Rule } from "antd/es/form"
import { FormLayout } from "antd/es/form/Form"
import { Fragment } from "react/jsx-runtime"
import ButtonCustom, { ButtonCustomProps } from "../ButtonCustom/ButtonCustom"

interface FormComponentProps {
    formInstance: FormInstance,
    onFinish?: (value: any) => void
    type?: FormLayout,
    className?: string
    variant?: "outlined" | "borderless" | "filled" | undefined
    inputData: InputComponentProps[]
    actions?: ButtonCustomProps[]
}

export interface InputComponentProps {
    type: string,
    disabled?: boolean,
    rules?: Rule[],
    name: string,
    label: React.ReactNode,
    placeholder?: string,
    clasName?: string,
    formItemProps?: FormItemProps,
    fieldProps?: InputProps,

    // [key: string]: any;
}

const FormComponent: React.FC<FormComponentProps> = ({ inputData, formInstance, type, className, variant, actions, onFinish }) => {
    const renderInput = (item: InputComponentProps) => {
        switch (item.type) {
            case "text":
                return (
                    <Form.Item
                        name={item.name}
                        label={item.label}
                        rules={item.rules}
                        {...item.formItemProps}
                    >
                        <Input placeholder={item.placeholder} className={item.clasName} {...item.fieldProps} />
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
            {inputData.map((item, index) => (
                <Fragment key={index}>
                    {renderInput(item)}
                </Fragment>
            ))}
            <div className="flex items-center justify-end w-full gap-2">
                {actions && (
                    actions.map((item, index) => (
                        <div key={index} className="flex gap-2">
                            {renderButton(item)}
                        </div>
                    ))
                )}
            </div>
        </Form>
    )
}

export default FormComponent