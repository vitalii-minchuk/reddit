import { FC } from "react";
import {
  Divider,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { signOut, User } from "firebase/auth";
import { auth } from "../../../firebase/clientApp";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { communityState } from "../../../atoms/communitiesAtom";

interface IUserMenuProps {
  user: User;
}

const UserMenu: FC<IUserMenuProps> = ({ user }) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const resetCommunityState = useResetRecoilState(communityState)

  const handleSignOut = async () => {
    await signOut(auth);
    resetCommunityState();
  }
  return (
    <Menu>
      <MenuButton
        px={1.5}
        borderRadius={4}
        _hover={{ outline: "1px solid", outlineColor: "gray.300" }}
      >
        <Flex align="center">
          {user ? (
            <Flex align="center" gap={1}>
              <Icon as={FaRedditSquare} fontSize={24} mr={1} color="gray.300" />
              <Flex
                  display={{ base: "none", lg: "flex" }}
                  direction="column"
                  fontSize="8pt"
                  align="start"
                  mr={8}
                >
                  <Text fontWeight={700}>
                    {user?.displayName || user?.email?.split("@")[0]}
                  </Text>
                  <Flex align="center">
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">1 karma</Text>
                  </Flex>
                </Flex>
            </Flex>
          ) : (
            <Icon fontSize={24} color="gray.400" mr={1} as={VscAccount} />
          )}
          <ChevronDownIcon />
        </Flex>
      </MenuButton>
      <MenuList>
        {user ? (
          <>
            <MenuItem
              transition="all .3s"
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
            >
              <Flex align="center">
                <Icon as={CgProfile} fontSize={20} mr={2} />
                Profile
              </Flex>
            </MenuItem>
            <Divider />
            <MenuItem
              transition="all .3s"
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={handleSignOut}
            >
              <Flex align="center">
                <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
                Sign Out
              </Flex>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              transition="all .3s"
              fontSize="10pt"
              fontWeight={700}
              _hover={{ bg: "blue.500", color: "white" }}
              onClick={() => setAuthModalState({open: true, view: "signIn"})}
            >
              <Flex align="center">
                <Icon as={MdOutlineLogin} fontSize={20} mr={2} />
                Sign In / Sign Up
              </Flex>
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
