import { FC } from "react";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import { Community } from "../../atoms/communitiesAtom";

interface IHeaderProps {
  communityData: Community;
}
const Header: FC<IHeaderProps> = ({ communityData }) => {
  const isJoined = true;
  return (
    <Flex direction="column" h="146px" w="100%">
      <Box h="50%" bg="blue.400" />
      <Flex justify="center" flexGrow={1} bg="white">
        <Flex width="95%" maxW="860px">
          {communityData.imageURL ? (
            <Image />
          ) : (
            <Icon
              as={FaReddit}
              fontSize={64}
              color="blue.500"
              position="relative"
              top={-3}
              border="4px solid white"
              borderRadius="50%"
            />
          )}
          <Flex py={4}>
            <Flex direction="column" mx={6}>
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={600} fontSize="10pt" color="gray.500">
                r/{communityData.id}
              </Text>
            </Flex>
            <Button
              onClick={() => {}}
              h="30px"
              px={6}
              variant={isJoined ? "outline" : "solid"}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
