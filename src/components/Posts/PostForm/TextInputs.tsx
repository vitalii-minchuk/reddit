import { ChangeEvent, FC } from "react";
import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";

interface ITextInputsProps {
  textInputs: {
    title: string;
    body: string;
  };
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleCreatePost: () => void;
  loading: boolean;
}
const TextInputs: FC<ITextInputsProps> = ({
  textInputs,
  onChange,
  handleCreatePost,
  loading,
}) => {
  return (
    <Stack spacing={3} w="100%">
      <Input
        value={textInputs.title}
        onChange={onChange}
        name="title"
        fontSize="10pt"
        borderRadius={4}
        placeholder="Title"
        _placeholder={{
          color: "gray.500",
        }}
        _hover={{
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
        }}
      />
      <Textarea
        value={textInputs.body}
        onChange={onChange}
        name="body"
        fontSize="10pt"
        h="100px"
        borderRadius={4}
        placeholder="Text (optional)"
        _placeholder={{
          color: "gray.500",
        }}
        _hover={{
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
        }}
      />
      <Flex justify="end" py={2}>
        <Button h="34px" px="30px" isLoading={loading} disabled={!textInputs.title} onClick={handleCreatePost}>
          post
        </Button>
      </Flex>
    </Stack>
  );
};

export default TextInputs;
