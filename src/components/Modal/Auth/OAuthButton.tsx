import { FC } from "react";

import { Button, Flex, Image } from "@chakra-ui/react";

const OAuthButton: FC = () => {
  return (
    <Flex direction="column" w="100%" mb={4}>
      <Button mb={2} variant="oauth">
        <Image h="18px" mr={2} src="/images/googlelogo.png" alt="google logo" />
        Continue with Google
      </Button>
      <Button variant="oauth">Some Other Provider</Button>
    </Flex>
  );
};

export default OAuthButton;
