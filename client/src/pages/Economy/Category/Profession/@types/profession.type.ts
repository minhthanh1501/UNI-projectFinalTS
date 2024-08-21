export interface DataType {
  key: React.Key;
  _id: string;
  name: string;
  field: string;
}

export interface ModalCreateOrUpdateProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  uid?: string;
}

export interface Profession {
  _id: string;
  code: string;
  name: string;
  field: string;
  parent_id: {
    _id: string;
  };
}

export type Professions = Profession[];
