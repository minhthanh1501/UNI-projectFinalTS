export interface ModalCreateOrUpdateProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  id?: string;
  children: React.ReactNode;
}
