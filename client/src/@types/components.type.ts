import { ButtonCustomProps } from "@/components/commons/ButtonCustom/ButtonCustom";
import { FormInstance, InputProps, SelectProps } from "antd";
import { FormItemProps, Rule } from "antd/es/form";
import { FormLayout } from "antd/es/form/Form";
import { TextAreaProps } from "antd/es/input";

export interface FormComponentProps {
  formInstance: FormInstance;
  onFinish?: (value: any) => void;
  type?: FormLayout;
  className?: string;
  variant?: "outlined" | "borderless" | "filled" | undefined;
  inputData: InputComponentProps[];
  actions?: ButtonCustomProps[];
}

export interface InputComponentProps {
  type: "text" | "password" | "select" | "textarea";
  disabled?: boolean;
  rules?: Rule[];
  name: string;
  label: React.ReactNode;
  placeholder?: string;
  className?: string;
  formItemProps?: FormItemProps;
  fieldProps?: InputProps;
  fieldAreaProps?: TextAreaProps;
  selectProps?: SelectProps;
  // [key: string]: any;
}

export interface ModalCreateOrUpdateProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  id?: string;
}

export interface ModalDeleteProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  id: string;
}
