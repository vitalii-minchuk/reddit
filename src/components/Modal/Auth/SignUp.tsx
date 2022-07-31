import { ChangeEvent, FC, FormEvent, useState } from "react";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { FIREBASE_ERRORS } from "../../../firebase/errors";

const SignUp: FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");
  const [createUserWithEmailAndPassword, user, loading, userError] =
    useCreateUserWithEmailAndPassword(auth);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSignUpForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (formError) setFormError("");
    if (!signUpForm.email.includes("@")) {
      return setFormError("Please enter a valid email");
    }
    if (signUpForm.password !== signUpForm.confirmPassword) {
      return setFormError("Passwords do not match");
    }
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
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
      <Input
        required
        mb={2}
        name="confirmPassword"
        placeholder="Confirm Password"
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
        {formError ||
          FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>
      <Button isLoading={loading} my={2} h="36px" w="100%" type="submit">
        Sign Up
      </Button>
      <Flex fontSize="9pt" justify="center">
        <Text mr={1}>Already a redditor?</Text>
        <Text
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signIn",
            }))
          }
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
        >
          SIGN IN
        </Text>
      </Flex>
    </form>
  );
};

export default SignUp;
