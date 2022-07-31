import { FC } from "react";
import { Button, Flex } from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "../../Modal/Auth";
import { signOut, User } from "firebase/auth";
import { auth } from "../../../firebase/clientApp";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

interface IRightContentProps {
  user: User;
}

const RightContent: FC<IRightContentProps> = ({ user }) => {
  return (
    <>
      <AuthModal />
      <Flex justify="center" align={"center"}>
        {user ? <Icons /> : <AuthButtons />}
        <UserMenu user={user as User} />
      </Flex>
    </>
  );
};

export default RightContent;
