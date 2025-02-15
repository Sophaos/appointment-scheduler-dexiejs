export interface EntityDrawerProps<T> {
  data?: T;
  handleHide: () => void;
  isOpen: boolean;
}
