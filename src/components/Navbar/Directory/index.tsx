import { FC } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TiHome } from "react-icons/ti";
import { Flex, Icon, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react";
import Communities from "./Communities";

const Directory: FC = () => {
  return (
    <Menu>
      <MenuButton
        px={1.5}
        borderRadius={4}
        mx={1}
        _hover={{ outline: "1px solid", outlineColor: "gray.300" }}
      >
        <Flex
          align="center"
          justify="space-between"
          w={{ base: "auto", lg: "150px" }}
        >
          <Flex align="center">
            <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={TiHome} />
            <Text
              pt={1}
              display={{ base: "none", md: "unset" }}
              fontWeight={700}
              fontSize="10pt"
            >
              Home
            </Text>
          </Flex>
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        <Communities />
      </MenuList>
    </Menu>
  );
};

export default Directory;
