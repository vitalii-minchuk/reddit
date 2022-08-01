import { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import PageContent from "../../../components/Layout/PageContent";
import NewPostForm from "../../../components/Posts/NewPostForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";

const SubmitPostPage: FC = () => {
  const [user] = useAuthState(auth);
  return (
    <PageContent>
      <>
        <Box py={4} borderBottom="1px solid" borderColor="white">
          <Text>Create a post</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <>hello</>
    </PageContent>
  );
};

export default SubmitPostPage;
