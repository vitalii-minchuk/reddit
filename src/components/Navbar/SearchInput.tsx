import { FC } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { User } from "firebase/auth";

interface ISearchInputProps {
  user: User
}

const SearchInput: FC<ISearchInputProps> = ({ user }) => {
  return (
    <Flex grow={1} maxW={user ? "auto" : "600px"} align="center">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.400" mb={1} ml={2} />
        </InputLeftElement>
        <Input
          mx={2}
          placeholder="Search Reddit"
          fontSize={{base: "9pt", sm:"10pt"}}
          height="34px"
          bg="gray.50"
          border="1px solid"
          borderColor="gray.300"
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: "white",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
