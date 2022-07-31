import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs"
import { HiLockClosed } from "react-icons/hi"


interface ICreateCommunityModalProps {
  open: boolean;
  handleClose: () => void;
}

const CreateCommunityModal: FC<ICreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [communityName, setCommunityName] = useState("");
  const [communityType, setCommunityType] = useState("Public");
  const [charsRemaining, setCharsRemaining] = useState(21);

  useEffect(() => {
    setCommunityName("");
    setCharsRemaining(21);
  }, [open]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length > 21) {
      return;
    }
    setCommunityName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
  };

  return (
    <>
      <Modal isOpen={open} onClose={handleClose} size="md">
        <ModalOverlay />
        <ModalContent mx={2}>
          <ModalHeader>Create a community</ModalHeader>
          <Box px={3}>
            <ModalCloseButton />
            <ModalBody display="flex" flexDirection="column" py="10px">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text color="gray.500" fontSize={11}>
                Community name including capitalization can not be changed
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                w="20px"
                color="gray.400"
              >
                r/
              </Text>
              <Input
                position="relative"
                onChange={handleChange}
                value={communityName}
                size="sm"
                pl="22px"
                mb={1}
                _hover={{
                  borderColor: "blue.500",
                }}
              />
              <Text
                fontSize="9pt"
                color={charsRemaining === 0 ? "red.500" : "gray.500"}
              >
                {charsRemaining} Characters remaining
              </Text>
              <Box>
                <Text fontSize={15} fontWeight={600} my={4}>
                  Community Type
                </Text>
                <RadioGroup onChange={setCommunityType} value={communityType}>
                  <Flex direction="column" gap={4} >
                    <Radio value="Public">
                      <Flex align="center" gap={2}>
                        <Icon color="gray.500" as={BsFillPersonFill} />
                        <Text fontSize="10pt">Public</Text>
                        <Text alignSelf="start" fontSize="8pt" color="gray.500">
                          Anyone can view, post and comment to this community
                        </Text>
                      </Flex>
                    </Radio>
                    <Divider borderColor={communityType === "Public" ? "blue.500" : "inherit"} />
                    <Radio value="Restricted">
                      <Flex align="center" gap={2}>
                        <Icon color="gray.500" as={BsFillEyeFill} />
                        <Text fontSize="10pt">Restricted</Text>
                        <Text alignSelf="start" fontSize="8pt" color="gray.500">
                          Anyone can view this community, but only approved
                          users can post
                        </Text>
                      </Flex>
                    </Radio>
                    <Divider borderColor={communityType === "Restricted" ? "blue.500" : "inherit"} />
                    <Radio value="Private">
                      <Flex align="center" gap={2}>
                        <Icon color="gray.500" as={HiLockClosed} />
                        <Text fontSize="10pt">Private</Text>
                        <Text alignSelf="start" fontSize="8pt" color="gray.500">
                          Only approved users can view and submit to this community
                        </Text>
                      </Flex>
                    </Radio>
                    <Divider borderColor={communityType === "Private" ? "blue.500" : "inherit"} />
                  </Flex>
                </RadioGroup>
              </Box>
            </ModalBody>
          </Box>
          <ModalFooter bg="gray.100" borderRadius="0 0 10px 10px">
            <Button variant="outline" h="30px" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button  h="30px" onClick={() => {}}>Create Community</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
