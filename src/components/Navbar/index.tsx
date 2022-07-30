import { FC } from "react";
import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { User } from "firebase/auth";

const Navbar: FC = () => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Flex bg="white" h="44px" p="6px 12px">
      <Flex align="center">
        <Image h="30px" src="/images/redditFace.svg" alt="reddit face" />
        <Image
          h="46px"
          src="/images/redditText.svg"
          alt="reddit text"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      <SearchInput />
      <RightContent user={user as User} />
    </Flex>
  );
};

export default Navbar;
