import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { authModalState } from "../../../atoms/authModalAtom";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

const SignIn: FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (formError) setFormError("");
    if (!loginForm.email.includes("@")) {
      return setFormError("Please enter a valid email");
    }
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Input
        required
        mb={2}
        name="email"
        placeholder="Email"
        type="email"
        onChange={handleChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Input
        required
        mb={2}
        name="password"
        placeholder="Password"
        type="password"
        onChange={handleChange}
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />
      <Text fontSize="9pt" textAlign="center" color="red.500">
        {formError || FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button isLoading={loading} my={2} h="36px" w="100%" type="submit">
        Sign in
      </Button>
      <Flex justify="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize="9pt"
          color="blue.500"
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "resetPassword",
            }))
          }
        >
          Reset
        </Text>
      </Flex>
      <Flex fontSize="9pt" justify="center">
        <Text mr={1}>New here?</Text>
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signUp",
            }))
          }
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};

export default SignIn;
