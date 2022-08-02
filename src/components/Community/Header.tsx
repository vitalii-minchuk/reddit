import { FC } from "react";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import { Community } from "../../atoms/communitiesAtom";
import useCommunityData from "../../hooks/useCommunityData";

interface IHeaderProps {
  communityData: Community;
}
const Header: FC<IHeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined = Boolean(
    communityStateValue.mySnippets.find(
      (item) => item.communityId === communityData.id
    )
  );

  return (
    <Flex direction="column" h="146px" w="100%">
      <Box h="50%" bg="blue.400" />
      <Flex justify="center" flexGrow={1} bg="white">
        <Flex width="95%" maxW="860px">
          {communityStateValue.currentCommunity?.imageURL ? (
            <Image
              borderRadius="full"
              boxSize="66px"
              position="relative"
              top={-3}
              objectFit="cover"
              border="4px solid white"
              src={communityStateValue.currentCommunity.imageURL}
              alt="community image"
            />
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
              isLoading={loading}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
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
