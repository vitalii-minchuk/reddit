import { FC } from "react";
import { GetServerSidePropsContext } from "next";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/clientApp";
import { Community } from "../../../atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import { Flex } from "@chakra-ui/react";
import CommunityNotFound from "../../../components/Community/CommunityNotFound";
import Header from "../../../components/Community/Header";
import PageContent from "../../../components/Layout/PageContent";

interface ICommunityPageProps {
  communityData: Community;
}

const CommunityPage: FC<ICommunityPageProps> = ({ communityData }) => {
  if (!communityData) {
    return <CommunityNotFound />;
  }
  return (
    <>
      <Header communityData={communityData} />
      <PageContent>
        <>ddddd</>
        <>fffff</>
      </PageContent>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const communityDocRef = doc(
      firestore,
      "communities",
      context.query.communityId as string
    );
    const communityDoc = await getDoc(communityDocRef);
    return {
      props: {
        communityData: communityDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
            )
          : "",
      },
    };
  } catch (error) {
    console.log(error);
  }
}
export default CommunityPage;