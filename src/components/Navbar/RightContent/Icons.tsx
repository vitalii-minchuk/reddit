import { FC } from "react";
import { Flex, Icon } from "@chakra-ui/react";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import { GrAdd } from "react-icons/gr";
import {
  IoFilterCircleOutline,
  IoNotificationsOutline,
  IoVideocamOutline,
} from "react-icons/io5";

const Icons: FC = () => {
  return (
    <Flex>
      <Flex
        display={{ base: "none", md: "flex" }}
        align="center"
        borderRight="1px solid"
        borderColor="gray.200"
      >
        <Flex
          mx={1.5}
          p={1}
          borderRadius={4}
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={BsArrowUpRightCircle} fontSize={20} />
        </Flex>
        <Flex
          mx={1.5}
          p={1}
          borderRadius={4}
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoFilterCircleOutline} fontSize={22} />
        </Flex>
        <Flex
          mx={1.5}
          p={1}
          borderRadius={4}
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoVideocamOutline} fontSize={22} />
        </Flex>
      </Flex>
      <Flex>
        <Flex
          mx={1.5}
          p={1}
          borderRadius={4}
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={BsChatDots} fontSize={20} />
        </Flex>
        <Flex
          mx={1.5}
          p={1}
          borderRadius={4}
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={IoNotificationsOutline} fontSize={20} />
        </Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          mx={1.5}
          p={1}
          borderRadius={4}
          cursor="pointer"
          _hover={{ bg: "gray.200" }}
        >
          <Icon as={GrAdd} fontSize={20} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Icons;
