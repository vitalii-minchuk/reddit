import { FC } from "react";
import { Flex, Image } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { User } from "firebase/auth";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent";
import Directory from "./Directory";
import useDirectory from "../../hooks/useDirectory";
import { defaultMenuItem } from "../../atoms/directoryMenuAtom";

const Navbar: FC = () => {
  const [user, loading, error] = useAuthState(auth);
  const { onSelectMenuItem } = useDirectory();

  return (
    <Flex bg="white" h="44px" p="6px 12px" justify="space-between">
      <Flex
        cursor="pointer"
        align="center"
        minW="24px"
        mr={{ base: 1, md: 2 }}
        onClick={() => onSelectMenuItem(defaultMenuItem)}
      >
        <Image h="24px" src="/images/redditFace.svg" alt="reddit face" />
        <Image
          h="46px"
          src="/images/redditText.svg"
          alt="reddit text"
          display={{ base: "none", md: "unset" }}
        />
      </Flex>
      {user && <Directory />}
      <SearchInput user={user as User} />
      <RightContent user={user as User} />
    </Flex>
  );
};

export default Navbar;
