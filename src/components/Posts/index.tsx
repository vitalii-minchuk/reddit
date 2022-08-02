import { FC, useCallback, useEffect, useState } from "react";
import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Community } from "../../atoms/communitiesAtom";
import { Post } from "../../atoms/postAtom";
import { auth, firestore } from "../../firebase/clientApp";
import usePost from "../../hooks/usePost";
import PostItem from "./PostItem";
import PostLoader from "./PostLoader";

interface IPostsProps {
  communityData: Community;
  userId?: string;
}
const Posts: FC<IPostsProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    postStateValue,
    setPostStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePost();

  const getPosts = useCallback(async () => {
    setLoading(true);
    try {
      const postsQuery = query(
        collection(firestore, "posts"),
        where("communityId", "==", communityData.id),
        orderBy("createdAt", "desc")
      );
      const postDocs = await getDocs(postsQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
    setLoading(false);
  }, [communityData.id, setPostStateValue]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {postStateValue.posts.map((item) => (
            <PostItem
              key={item.id}
              userIsCreator={user?.uid === item.creatorId}
              userVoteValue={
                postStateValue.postVotes.find((vote) => vote.postId === item.id)?.voteValue
              }
              post={item}
              onDeletePost={onDeletePost}
              onSelectPost={onSelectPost}
              onVote={onVote}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export default Posts;
