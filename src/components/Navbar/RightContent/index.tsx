import { FC } from "react";
import { Button, Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "../../Modal/Auth";
import { signOut, User } from "firebase/auth";
import { auth } from "../../../firebase/clientApp";

interface IRightContentProps {
  user: User;
}

const RightContent: FC<IRightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align={"center"}>
        {user ? (
          <Button
            height="28px"
            display={{ base: "none", sm: "flex" }}
            width={{ base: "70px", md: "110px" }}
            mr={2}
            variant="solid"
            onClick={() => signOut(auth)}
          >
            Sign Out
          </Button>
        ) : (
          <AuthButtons />
        )}
      </Flex>
    </>
  );
};

export default RightContent;
