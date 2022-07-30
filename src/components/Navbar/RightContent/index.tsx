import { FC } from "react";

import { Container, Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "../../Modal/Auth";

const RightContent: FC = () => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align={"center"}>
        <AuthButtons />
      </Flex>
    </>
  );
};

export default RightContent;
