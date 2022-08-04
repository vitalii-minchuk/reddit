import { FC, useEffect, useState } from "react";
import {
  Flex,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  Icon,
  Image,
  Box,
  Button,
} from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { Community } from "../../atoms/communitiesAtom";
import { firestore } from "../../firebase/clientApp";
import useCommunityData from "../../hooks/useCommunityData";
import Link from "next/link";
import { FaReddit } from "react-icons/fa";

const Recommendations: FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getCommunityRecommendations = async () => {
    setLoading(true);
    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );
      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communities as Community[]);
    } catch (error) {
      console.log("getCommunityRecommendations", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  return (
    <Flex
      direction="column"
      border="1px solid"
      borderColor="gray.200"
      borderRadius={4}
      bg="white"
    >
      <Flex
        align="flex-end"
        bgImage="url(/images/recCommsArt.png)"
        bgSize="cover"
        color="white"
        p="6px 10px"
        fontWeight={600}
        height="70px"
        borderRadius="4px 4px 0 0"
        bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.77)), url(/images/recCommsArt.png)"
      >
        Top Communities
      </Flex>
      <Flex direction="column">
        {loading ? (
          <Stack mt={2} p={3}>
            <Flex align="center" justify="space-between">
              <SkeletonCircle size="10" />
              <Skeleton h="10px" w="70%" />
            </Flex>
            <Flex align="center" justify="space-between">
              <SkeletonCircle size="10" />
              <Skeleton h="10px" w="70%" />
            </Flex>
            <Flex align="center" justify="space-between">
              <SkeletonCircle size="10" />
              <Skeleton h="10px" w="70%" />
            </Flex>
          </Stack>
        ) : (
          <>
            {communities?.map((item, index) => {
              const isJoined = Boolean(
                communityStateValue.mySnippets.find(
                  (snippet) => snippet.communityId === item.id
                )
              );
              return (
                <Link key={item.id} href={`/r/${item.id}`}>
                  <Flex
                    cursor="pointer"
                    align="center"
                    position="relative"
                    py={3.5}
                    px={4}
                    fontSize="9pt"
                    borderBottom="1px solid"
                    borderColor="gray.200"
                  >
                    <Flex align="center" w="80%">
                      <Flex w="15%">
                        <Text fontWeight={700}>{index + 1}</Text>
                      </Flex>
                      <Flex align="center" w="80%">
                        {item.imageURL ? (
                          <Image
                            src={item.imageURL}
                            alt="community image"
                            borderRadius="full"
                            boxSize="28px"
                            mr={2}
                          />
                        ) : (
                          <Icon
                            as={FaReddit}
                            fontSize={30}
                            color="brand.100"
                            mr={2}
                          />
                        )}
                        <span
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {`r/${item.id}`}
                        </span>
                      </Flex>
                    </Flex>
                    <Box>
                      <Button
                      position="absolute"
                      right="8px"
                      bottom="17px"
                        h="22px"
                        fontSize="8pt"
                        variant={isJoined ? "outline" : "solid"}
                        onClick={(event) => {
                          event.stopPropagation();
                          onJoinOrLeaveCommunity(item, isJoined)
                        }}
                      >
                        {isJoined ? "Joined" : "Join"}
                      </Button>
                    </Box>
                  </Flex>
                </Link>
              );
            })}
            <Box p="10px 20px">
              <Button w="100%" h="30px">View All</Button>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Recommendations;
