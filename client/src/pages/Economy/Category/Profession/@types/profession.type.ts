export interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

export interface ModalCreateOrUpdateProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  uid?: string;
}
