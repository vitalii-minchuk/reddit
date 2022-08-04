import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import { Stack } from "@chakra-ui/react";
import PageContent from "../components/Layout/PageContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase/clientApp";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { Post, PostVote } from "../atoms/postAtom";
import usePost from "../hooks/usePost";
import PostLoader from "../components/Posts/PostLoader";
import PostItem from "../components/Posts/PostItem";
import CreatePostLink from "../components/Community/CreatePostLink";
import useCommunityData from "../hooks/useCommunityData";
import Recommendations from "../components/Community/Recommendations";
import Premium from "../components/Community/Premium";
import PersonalHome from "../components/Community/PersonalHome";

const Home: NextPage = () => {
  const [user, loadingUser] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    setPostStateValue,
    postStateValue,
    onDeletePost,
    onSelectPost,
    onVote,
  } = usePost();
  const { communityStateValue } = useCommunityData();

  const buildNoUserHomeFeed = useCallback(async () => {
    setLoading(true);
    try {
      const postQuery = query(
        collection(firestore, "posts"),
        orderBy("voteStatus", "desc"),
        limit(10)
      );
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPostStateValue((prev) => ({
        ...prev,
        posts: posts as Post[],
      }));
    } catch (error) {
      console.log("buildNoUserHomeFeed", error);
    }
    setLoading(false);
  }, [setPostStateValue]);

  const buildUserHomeFeed = useCallback(async () => {
    setLoading(true);
    try {
      if (communityStateValue.mySnippets.length) {
        const myCommunityIds = communityStateValue.mySnippets.map(
          (snippet) => snippet.communityId
        );
        const postQuery = query(
          collection(firestore, "posts"),
          where("communityId", "in", myCommunityIds),
          limit(10)
        );
        const postDocs = await getDocs(postQuery);
        const posts = postDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostStateValue((prev) => ({
          ...prev,
          posts: posts as Post[],
        }));
      } else {
        buildNoUserHomeFeed();
      }
    } catch (error) {
      console.log("buildUserHomeFeed", error);
    }
    setLoading(false);
  }, [setPostStateValue, buildNoUserHomeFeed, communityStateValue.mySnippets]);

  const getUsersPostVotes = useCallback(async () => {
    try {
      const postIds = postStateValue.posts.map((post) => post.id);
      const postVotesQuery = query(
        collection(firestore, `users/${user?.uid}/postVotes`),
        where("postId", "in", postIds)
      );
      const postsVoteDocs = await getDocs(postVotesQuery);
      const postVotes = postsVoteDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: postVotes as PostVote[],
      }));
    } catch (error) {
      console.log("getUsersPostVotes", error);
    }
  }, [setPostStateValue, user?.uid, postStateValue.posts]);

  useEffect(() => {
    if (communityStateValue.snippetsFetched) buildUserHomeFeed();
  }, [user, communityStateValue.snippetsFetched, buildUserHomeFeed]);

  useEffect(() => {
    if (!user && !loadingUser) buildNoUserHomeFeed();
  }, [user, loadingUser, buildNoUserHomeFeed]);

  useEffect(() => {
    if (user && postStateValue.posts.length) getUsersPostVotes();

    return () => {
      setPostStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    };
  }, [user, postStateValue.posts, getUsersPostVotes, setPostStateValue]);

  return (
    <PageContent>
      <>
        <CreatePostLink />
        {loading ? (
          <PostLoader />
        ) : (
          <Stack>
            {postStateValue.posts.map((item) => (
              <PostItem
                key={item.id}
                userIsCreator={user?.uid === item.creatorId}
                userVoteValue={
                  postStateValue.postVotes.find(
                    (vote) => vote.postId === item.id
                  )?.voteValue
                }
                post={item}
                onDeletePost={onDeletePost}
                onSelectPost={onSelectPost}
                onVote={onVote}
                homePage
              />
            ))}
          </Stack>
        )}
      </>
      <>
        <Stack spacing={5}>
          <Recommendations />
          <Premium />
          <PersonalHome />
        </Stack>
      </>
    </PageContent>
  );
};

export default Home;
