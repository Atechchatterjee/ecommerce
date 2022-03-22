import React, { useRef, useEffect, useContext } from "react";
import { UploadContext } from "../../context/UploadContext";
import { Input } from "@chakra-ui/react";
import { CustomField } from "./CustomField";

interface Props {
  getFile?: (_: File) => void;
}

const Upload: React.FC<Props> = ({ getFile }) => {
  const InputRef = useRef<any>(null);
  const { triggerUpload, setTriggerUpload } = useContext(UploadContext);

  useEffect(() => {
    if (triggerUpload) InputRef.current.click();
  }, [triggerUpload, setTriggerUpload]);

  return (
    <CustomField
      type="file"
      defaultValue={undefined}
      itemRef={InputRef.current}
      display="none"
      onChange={(event: any) => {
        const file: File = event.target.files[0];
        setTriggerUpload(false);
        console.log("file", file);
        if (getFile) getFile(file);
      }}
    />
  );
};

export default Upload;
