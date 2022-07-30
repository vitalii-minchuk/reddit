import { FC } from "react";

import { Button } from "@chakra-ui/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";

const AuthButtons: FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <>
      <Button
        onClick={() => setAuthModalState({open: true, view: "signIn"})}
        mr={2}
        w={{ base: "70px", md: "110px" }}
        h="28px"
        display={{ base: "none", sm: "flex" }}
        variant="outline"
      >
        Sign in
      </Button>
      <Button
        onClick={() => setAuthModalState({open: true, view: "signUp"})}
        mr={2}
        w={{ base: "70px", md: "110px" }}
        h="28px"
        display={{ base: "none", sm: "flex" }}
      >
        Sign up
      </Button>
    </>
  );
};

export default AuthButtons;
