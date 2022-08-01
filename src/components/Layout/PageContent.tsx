import { Flex } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

interface IPageContentProps {
  children: ReactNode;
}

const PageContent: FC<IPageContentProps> = ({ children }) => {
  return (
    <Flex py={4} justify="center">
      <Flex justify="center" w="95%" maxW="860px">
        <Flex
          direction="column"
          w={{ base: "100%", md: "65%" }}
          mr={{ base: 0, md: 6 }}
        >
          {children && children[0 as keyof typeof children]}
        </Flex>
        <Flex
          direction="column"
          flexGrow={1}
          display={{ base: "none", md: "flex" }}
        >
          {children && children[1 as keyof typeof children]}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageContent;
