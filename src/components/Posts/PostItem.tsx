import { FC, useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
  Icon,
  Image,
  Skeleton,
  Spinner,
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
  onVote: (post: Post, vote: number, communityId: string) => void;
  onDeletePost: (post: Post) => Promise<boolean>;
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
  const [error, setError] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const success = await onDeletePost(post);
      if (!success) {
        throw new Error("Failed to delete post");
      }
    } catch (error: any) {
      console.log("handleDelete", error);
      setError(error.message);
    }
    setLoadingDelete(false);
  };

  useEffect(() => {
    if (!error) return
    const timer = setTimeout(() => {
      setError("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [error]);

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
          onClick={() => onVote(post, 1, post.communityId)}
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
          onClick={() => onVote(post, -1, post.communityId)}
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
        <Flex m="0 0 12px 20px" color="gray.500" fontWeight={600} flexWrap="wrap">
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
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize="9pt">Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
        {error && (
          <Alert status="error" borderBottomRightRadius={4}>
            <AlertIcon />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
      </Flex>
    </Flex>
  );
};

export default PostItem;
