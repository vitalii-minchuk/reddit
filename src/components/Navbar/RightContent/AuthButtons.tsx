import { FC } from "react";

import { Button } from "@chakra-ui/react";

const AuthButtons: FC = () => {
  return (
    <>
      <Button
        onClick={() => {}}
        mr={2}
        w={{ base: "70px", md: "110px" }}
        h="28px"
        display={{ base: "none", sm: "flex" }}
        variant="outline"
      >
        Sign in
      </Button>
      <Button
        onClick={() => {}}
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
