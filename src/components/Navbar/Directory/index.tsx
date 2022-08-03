import { FC } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { TiHome } from "react-icons/ti";
import {
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import Communities from "./Communities";
import useDirectory from "../../../hooks/useDirectory";

const Directory: FC = () => {
  const { toggleMenuOpen, directoryState } = useDirectory();

  return (
    <Menu isOpen={directoryState.isOpen}>
      <MenuButton
        px={1.5}
        borderRadius={4}
        mx={1}
        _hover={{ outline: "1px solid", outlineColor: "gray.300" }}
        onClick={toggleMenuOpen}
      >
        <Flex
          align="center"
          justify="space-between"
          w={{ base: "auto", lg: "150px" }}
        >
          <Flex align="center">
            {directoryState.selectedMenuItem?.imageURL ? (
              <Image
                borderRadius="full"
                boxSize="24px"
                mr={2}
                src={directoryState.selectedMenuItem.imageURL}
                alt="community image"
              />
            ) : (
              <Icon
                fontSize={24}
                mr={{ base: 1, md: 2 }}
                color={directoryState.selectedMenuItem.iconColor}
                as={directoryState.selectedMenuItem.icon}
              />
            )}
            <Text
              pt={1}
              display={{ base: "none", md: "unset" }}
              fontWeight={700}
              fontSize="10pt"
            >
              {directoryState.selectedMenuItem.displayText}
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
