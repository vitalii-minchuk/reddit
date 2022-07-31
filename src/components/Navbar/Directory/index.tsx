import { FC } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex, Menu,
  MenuButton, MenuList
} from "@chakra-ui/react";

const Directory: FC = () => {
  return (
    <Menu>
      <MenuButton
        px={1.5}
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.300" }}
      >
        <Flex align="center">

          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>

      </MenuList>
    </Menu>
  );
};

export default Directory;
