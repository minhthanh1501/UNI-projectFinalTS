import { Input, Select } from "antd"
import Form from "antd/es/form"
import ButtonCustom, { ButtonCustomProps } from "../ButtonCustom/ButtonCustom"
import { FormComponentProps, InputComponentProps } from "@/@types/components.type";



const FormComponent: React.FC<FormComponentProps> = ({ inputData, formInstance, type, className, variant, actions, onFinish }) => {
    const renderInput = (item: InputComponentProps) => {
        switch (item.type) {
            case "text":
                return (
                    <Form.Item
                        name={item.name}
                        label={item.label}
                        rules={item.rules}
                        className={item.className}
                        {...item.formItemProps}
                    >
                        <Input placeholder={item.placeholder} {...item.fieldProps} />
                    </Form.Item>
                );
            case "password":
                return (
                    <Form.Item
                        name={item.name}
                        label={item.label}
                        rules={item.rules}
                        className={item.className}
                        {...item.formItemProps}
                    >
                        <Input.Password placeholder={item.placeholder} {...item.fieldProps} />
                    </Form.Item>
                );
            case "select":
                return (
                    <Form.Item
                        name={item.name}
                        label={item.label}
                        rules={item.rules}
                        {...item.formItemProps}
                    >
                        <Select
                            showSearch
                            allowClear={true}
                            placeholder="---Chọn---"
                            {...item.selectProps}
                        />
                    </Form.Item>
                )
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
            <div className="w-full flex flex-wrap gap-2">
                {inputData.map((item, index) => (
                    <div key={index}>
                        {renderInput(item)}
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-end w-full gap-2">
                {actions && (
                    actions.map((item, index) => (
                        <div key={index}>
                            {renderButton(item)}
                        </div>
                    ))
                )}
            </div>
        </Form >
    )
}

export default FormComponent