import { FC } from "react";
import { Flex, Icon, Input } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import { IoImageOutline } from "react-icons/io5";
import { BsLink45Deg } from "react-icons/bs";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../atoms/authModalAtom";
import { auth } from "../../firebase/clientApp";
import useDirectory from "../../hooks/useDirectory";

const CreatePostLink: FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const { toggleMenuOpen } = useDirectory();
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleClick = () => {
    if (!user) {
      setAuthModalState({ open: true, view: "signIn" });
    }
    const { communityId } = router.query;
    if (communityId) {
      router.push(`/r/${communityId}/submit`);
      return;
    }
    toggleMenuOpen();
  };
  return (
    <Flex
      align="center"
      bg="white"
      h="56px"
      justify="space-evenly"
      borderRadius={4}
      py={2}
      mb={4}
      border="1px solid"
      borderColor="gray.300"
    >
      <Icon as={FaReddit} fontSize={36} color="gray.300" mx={2} />
      <Input
        flexGrow={1}
        placeholder="Create Post"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={4}
        onClick={handleClick}
      />
      <Flex
        mx={1.5}
        p={1}
        borderRadius={4}
        cursor="pointer"
        _hover={{ bg: "gray.200" }}
      >
        <Icon
          as={IoImageOutline}
          fontSize={24}
          color="gray.500"
          cursor="pointer"
        />
      </Flex>
      <Flex
        mx={1.5}
        p={1}
        borderRadius={4}
        cursor="pointer"
        _hover={{ bg: "gray.200" }}
      >
        <Icon
          as={BsLink45Deg}
          fontSize={24}
          color="gray.500"
          cursor="pointer"
        />
      </Flex>
    </Flex>
  );
};

export default CreatePostLink;
