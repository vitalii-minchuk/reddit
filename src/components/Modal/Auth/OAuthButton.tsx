import { FC } from "react";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

const OAuthButton: FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <Flex direction="column" w="100%" mb={4}>
      <Button
        isLoading={loading}
        onClick={() => signInWithGoogle()}
        mb={2}
        variant="oauth"
      >
        <Image h="18px" mr={2} src="/images/googlelogo.png" alt="google logo" />
        Continue with Google
      </Button>
      <Button variant="oauth">Some Other Provider</Button>
      {error && (
        <Text mt={1} fontSize="9pt" textAlign="center" color="red.500">
          {error.message}
        </Text>
      )}
    </Flex>
  );
};

export default OAuthButton;
