import { FC } from "react";
import { Timestamp } from "firebase/firestore";
import { Box, Flex, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import moment from "moment";
import {
  IoArrowDownCircleOutline,
  IoArrowUpCircleOutline,
} from "react-icons/io5";

export type Comment = {
  id: string;
  creatorId: string;
  creatorDisplayText: string;
  communityId: string;
  postId: string;
  postTitle: string;
  text: string;
  createdAt: Timestamp;
};

interface ICommentItemProps {
  comment: Comment;
  handleDeleteComment: (comment: Comment) => void;
  deleteLoading: boolean;
  userId: string;
}

const CommentItem: FC<ICommentItemProps> = ({
  comment,
  userId,
  deleteLoading,
  handleDeleteComment,
}) => {
  return (
    <Flex align="start" gap={3}>
      <Box>
        <Icon as={FaReddit} fontSize={30} color="gray.300" />
      </Box>
      <Stack>
        <Flex align="center" fontSize="8pt" gap={2}>
          <Text fontWeight={700}>{comment.creatorDisplayText}</Text>
          <Text color="gray.600">
            {moment(new Date(comment.createdAt?.seconds * 1000)).fromNow()}
          </Text>
          {deleteLoading && <Spinner size="sm" />}
        </Flex>
        <Text fontSize="10pt">{comment.text}</Text>
        <Flex align="center" cursor="pointer" gap={3}>
          <Icon as={IoArrowUpCircleOutline} />
          <Icon as={IoArrowDownCircleOutline} />
          {userId === comment.creatorId && (
            <>
              <Text fontSize="9pt" _hover={{ color: "blue.500" }}>
                Edit
              </Text>
              <Text
                fontSize="9pt"
                _hover={{ color: "blue.500" }}
                onClick={() => handleDeleteComment(comment)}
              >
                Delete
              </Text>
            </>
          )}
        </Flex>
      </Stack>
    </Flex>
  );
};

export default CommentItem;
