import { FC } from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { TabItem } from "./NewPostForm";

interface ITabItemProps {
  item: TabItem;
  selected: boolean;
  setSelectedTab: (value: string) => void;
}
const TabItem: FC<ITabItemProps> = ({ item, selected, setSelectedTab }) => {
  return (
    <Flex
      justify="center"
      align="center"
      gap={1}
      flexGrow={1}
      fontWeight={700}
      py="12px"
      cursor="pointer"
      color={selected ? "blue.500" : "gray.500"}
      borderWidth={selected ? "0 1px 2px 0" : "0 1px 1px 0"}
      borderBottomColor={selected ? "blue.500" : "gray.200"}
      borderRightColor="gray.200"
      _hover={{
        bg: "gray.50",
      }}
      onClick={() => setSelectedTab(item.title)}
    >
      <Flex align="center" h="20px">
        <Icon as={item.icon} />
      </Flex>
      <Text fontSize="10pt" display={{ base: "none", sm: "unset" }}>{item.title}</Text>
    </Flex>
  );
};

export default TabItem;
