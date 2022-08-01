import { ChangeEvent, FC, useRef } from "react";
import { Button, Flex, Image, Input } from "@chakra-ui/react";

interface IImageUploadProps {
  selectedFile?: string;
  handleSelectImage: (event: ChangeEvent<HTMLInputElement>) => void;
  setSelectedTab: (value: string) => void;
  setSelectedFile: (value: string) => void;
}
const ImageUpload: FC<IImageUploadProps> = ({
  selectedFile,
  handleSelectImage,
  setSelectedFile,
  setSelectedTab,
}) => {
  const selectedFileRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    selectedFileRef.current?.click();
  };

  return (
    <Flex justify="center" align="center" direction="column" w="100%">
      {selectedFile ? (
        <>
          <Image src={selectedFile} alt="photo" maxW="400px" maxH="400px" />
          <Flex gap={3} py={4}>
            <Button
              h="28px"
              onClick={() => setSelectedTab("Post")}
              variant="solid"
            >
              back to post
            </Button>
            <Button
              h="28px"
              onClick={() => setSelectedFile("")}
              variant="outline"
            >
              remove
            </Button>
          </Flex>
        </>
      ) : (
        <Flex
          p={20}
          justify="center"
          align="center"
          borderRadius={4}
          w="100%"
          border="1px dashed"
          borderColor="gray.300"
        >
          <Button h="28px" variant="outline" onClick={handleClick}>
            upload
          </Button>
          <Input
            ref={selectedFileRef}
            type="file"
            hidden
            onChange={handleSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default ImageUpload;
