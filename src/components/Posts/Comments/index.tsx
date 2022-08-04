import { FC, useCallback, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import { User } from "firebase/auth";
import { Post, postState } from "../../../atoms/postAtom";
import CommentInput from "./CommentInput";
import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";
import CommentItem, { Comment } from "./CommentItem";
import { useSetRecoilState } from "recoil";

interface ICommentsProps {
  communityId: string;
  post: Post | null;
  user: User;
}

const Comments: FC<ICommentsProps> = ({ communityId, user, post }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [deleteLoadingId, setDeleteLoadingId] = useState("");
  const setPostState = useSetRecoilState(postState);

  const handleCreateComment = async (commentText: string) => {
    setCreateLoading(true);
    try {
      const batch = writeBatch(firestore);
      const commentDocRef = doc(collection(firestore, "comments"));
      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.email!.split("@")[0],
        communityId,
        postId: post!.id,
        postTitle: post!.title,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };
      batch.set(commentDocRef, newComment);
      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;
      const postDocRef = doc(firestore, "posts", post?.id as string);
      batch.update(postDocRef, {
        numberOfComments: increment(1),
      });
      await batch.commit();
      setCommentText("");
      setComments((prev) => [newComment, ...prev]);
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! + 1,
        } as Post,
      }));
    } catch (error) {
      console.log("handleCreateComment", error);
    }
    setCreateLoading(false);
  };

  const handleDeleteComment = async (comment: Comment) => {
    setDeleteLoadingId(comment.id)
    try {
      const batch = writeBatch(firestore);
      const commentDocRef = doc(firestore, "comments", comment.id);
      batch.delete(commentDocRef);
      const postDocRef = doc(firestore, "posts", post!.id);
      batch.update(postDocRef, {
        numberOfComments: increment(-1),
      });
      await batch.commit();
      setPostState((prev) => ({
        ...prev,
        selectedPost: {
          ...prev.selectedPost,
          numberOfComments: prev.selectedPost?.numberOfComments! - 1,
        } as Post,
      }));
      setComments((prev) => prev.filter((item) => item.id !== comment.id));
    } catch (error) {
      console.log("handleDeleteComment", error);
    }
    setDeleteLoadingId("")
  };

  const getPostComments = useCallback(async () => {
    try {
      const commentsQuery = query(
        collection(firestore, "comments"),
        where("postId", "==", post?.id),
        orderBy("createdAt", "desc")
      );
      const commentDoc = await getDocs(commentsQuery);
      const comments = commentDoc.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(comments as Comment[]);
    } catch (error) {
      console.log("getPostComments", error);
    }
    setFetchLoading(false);
  }, [post?.id]);

  useEffect(() => {
    if (!post) return;
    getPostComments();
  }, [getPostComments, post]);

  return (
    <Box bg="white" borderRadius="0 0 4px 4px" p={2}>
      {!fetchLoading && (
        <Flex direction="column" pl={10} pr={4} mb={6} fontSize="10pt" w="100%">
          <CommentInput
            setCommentText={setCommentText}
            user={user}
            commentText={commentText}
            createLoading={createLoading}
            handleCreateComment={handleCreateComment}
          />
        </Flex>
      )}
      <Stack spacing={6} p={2}>
        {fetchLoading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} padding={6} bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt={4} noOfLines={2} spacing={4} />
              </Box>
            ))}
          </>
        ) : (
          <>
            {comments.length === 0 ? (
              <Flex
                direction="column"
                justify="center"
                align="center"
                borderTop="1px solid"
                borderColor="gray.200"
                p={20}
              >
                <Text fontWeight={700} opacity="0.5">
                  NO Comments Yet
                </Text>
              </Flex>
            ) : (
              <>
                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    handleDeleteComment={handleDeleteComment}
                    comment={comment}
                    userId={user?.uid}
                    deleteLoading={deleteLoadingId === comment.id}
                  />
                ))}
              </>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default Comments;
