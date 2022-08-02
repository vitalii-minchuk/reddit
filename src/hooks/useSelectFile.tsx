import { ChangeEvent, useState } from "react";

const useSelectFile = () => {
  const [selectedFile, setSelectedFile] = useState<string>();

  const handleSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  return {
    selectedFile,
    setSelectedFile,
    handleSelectImage,
  };
};

export default useSelectFile;
