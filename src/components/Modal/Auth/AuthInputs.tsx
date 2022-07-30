import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const AuthInputs: FC = () => {
  const { view } = useRecoilValue(authModalState);

  return (
    <Flex
      w="100%"
      mt={4}
      align="center"
      justify="center"
      direction="column"
    >
      {view === "signIn" && <SignIn />}
      {view === "signUp" && <SignUp />}
    </Flex>
  );
};

export default AuthInputs;
