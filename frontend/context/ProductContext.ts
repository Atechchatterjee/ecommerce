import { createContext } from 'react';

interface Props {
  edit: boolean;
  setEdit: (_: boolean) => void;
  triggerUpload: boolean;
  setTriggerUpload: (_: boolean) => void;
  changedImage: File | undefined;
  setChangedImage: (_:File | undefined) => void;
}

export const ProductContext = createContext<Props>({
  edit: false,
  setEdit: () => {},
  triggerUpload: false,
  setTriggerUpload: () => {},
  changedImage: undefined,
  setChangedImage: () => {},
});