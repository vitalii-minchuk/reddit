import { FC, useState } from "react";
import {
  Flex,
  Icon,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Post } from "../../atoms/postAtom";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import moment from "moment";
import { BsChat } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

interface IPostItemProps {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => {};
  onDeletePost: () => {};
  onSelectPost: () => void;
}
const PostItem: FC<IPostItemProps> = ({
  post,
  userIsCreator,
  onVote,
  onDeletePost,
  onSelectPost,
  userVoteValue,
}) => {
  const [loadingImage, setLoadingImage] = useState(true);
  return (
    <Flex
      bg="white"
      border="1px solid"
      borderColor="gray.300"
      borderRadius={4}
      mb={2}
      cursor="pointer"
      transition="all .3s"
      _hover={{ borderColor: "gray.500" }}
      onClick={onSelectPost}
    >
      <Flex
        direction="column"
        align="center"
        bg="gray.100"
        p={2}
        w="40px"
        borderRadius={4}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          fontSize={22}
          cursor="pointer"
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          onClick={onVote}
        />
        <Text fontSize="9pt">{post.voteStatus}</Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          fontSize={22}
          cursor="pointer"
          color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
          onClick={onVote}
        />
      </Flex>
      <Flex direction="column" w="100%">
        <Stack spacing={1} p="10pt">
          <Flex gap={1} align="center" fontSize="9pt">
            {}
            <Text>
              Posted by u/{post.creatorDisplayName},{" "}
              {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
            </Text>
          </Flex>
          <Text fontWeight={600} fontSize="12pt">
            {post.title}
          </Text>
          <Text fontSize="10pt">{post.body}</Text>
          {post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              {loadingImage && <Skeleton h="250px" w="100%" borderRadius={4} />}
              <Image
                src={post.imageURL}
                maxH="400px"
                alt="post image"
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
              />
            </Flex>
          )}
        </Stack>
        <Flex m="0 0 12px 20px" color="gray.500" fontWeight={600}>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize="9pt">{post.numberOfComments}</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt">Share</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize="9pt">Save</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              transition="all .3s"
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={onDeletePost}
            >
              <>
                <Icon as={AiOutlineDelete} mr={2} />
                <Text fontSize="9pt">Delete</Text>
              </>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PostItem;
