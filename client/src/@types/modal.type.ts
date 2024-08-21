export interface ModalCreateOrUpdateProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  id?: string;
}
