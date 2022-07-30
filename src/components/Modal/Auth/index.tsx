import { FC } from "react";

import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import AuthInputs from "./AuthInputs";
import OAuthButton from "./OAuthButton";

const AuthModal: FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);

  const handleClose = (): void => {
    setModalState((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <>
      <Modal isOpen={modalState.open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent mx={2}>
          <ModalHeader textAlign="center">
            {modalState.view === "signIn" && "Sign In"}
            {modalState.view === "signUp" && "Sign Up"}
            {modalState.view === "resetPassword" && "Reset Password"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            pb={6}
          >
            <Flex
              w="70%"
              align="center"
              justify="center"
              direction="column"
            >
              <OAuthButton />
              <Text color="gray.500" fontSize="10pt" fontWeight={700}>OR</Text>
              <AuthInputs />
              {/* <ResetPassword /> */}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AuthModal;
