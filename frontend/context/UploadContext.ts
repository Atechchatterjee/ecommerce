import { createContext } from 'react';

export const UploadContext = createContext<{
  triggerUpload: boolean;
  setTriggerUpload: (_: boolean) => void;
}>({
  triggerUpload: false,
  setTriggerUpload: () => {},
});
