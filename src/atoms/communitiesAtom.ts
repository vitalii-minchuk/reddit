import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Community = {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}

export type CommunitySnippet ={
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

type CommunityState = {
  mySnippets: CommunitySnippet[];
}

const defaultCommunityState: CommunityState= {
  mySnippets: [],
}

export const communityState = atom<CommunityState>({
  key: "communitiesState",
  default: defaultCommunityState,
});