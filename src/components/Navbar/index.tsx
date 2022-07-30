import { FC } from "react";

import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent";

const Navbar: FC = () => {
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
      <RightContent />
    </Flex>
  );
};

export default Navbar;
