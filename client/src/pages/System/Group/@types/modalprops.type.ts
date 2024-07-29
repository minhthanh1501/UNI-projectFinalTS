export interface ModalGroupProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  gid: string;
  uid?: string;
}
