import { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import PageContent from "../../../components/Layout/PageContent";
import NewPostForm from "../../../components/Posts/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";

const SubmitPostPage: FC = () => {
  const [user] = useAuthState(auth);
  const communityStateValue = useRecoilValue(communityState);
 
  return (
    <PageContent>
      <>
        <Box py={4} borderBottom="1px solid" borderColor="white">
          <Text>Create a post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <>
        {/* <About /> */}
      </>
    </PageContent>
  );
};

export default SubmitPostPage;
