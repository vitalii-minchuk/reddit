import { FC, useRef, useState } from "react";
import {
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Community, communityState } from "../../atoms/communitiesAtom";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";
import moment from "moment";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "../../firebase/clientApp";
import useSelectFile from "../../hooks/useSelectFile";
import { FaReddit } from "react-icons/fa";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useSetRecoilState } from "recoil";

interface IAboutProps {
  communityData: Community;
}
const About: FC<IAboutProps> = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const [uploadingImg, setUploadingImg] = useState(false);
  const { handleSelectImage, selectedFile, setSelectedFile } = useSelectFile();
  const setCommunityStateValue = useSetRecoilState(communityState)

  const selectedFileRef = useRef<HTMLInputElement>(null);

  const handleUpdateImage = async () => {
    if (!selectedFile) return;
    setUploadingImg(true)
    try {
      const imageRef = ref(storage, `community/${communityData.id}/image`);
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(firestore, "communities", communityData.id), {
        imageURL: downloadURL,
      });
      setCommunityStateValue(prev => ({
        ...prev,
        currentCommunity: {
          ...prev.currentCommunity,
          imageURL: downloadURL,
        } as Community,
      }))
    } catch (error) {
      console.log("handleUpdateImage", error);
    }
    setUploadingImg(false)
  };

  return (
    <Box position="sticky" top="14px">
      <Flex
        justify="space-between"
        align="center"
        borderRadius="4px 4px 0 0"
        bg="blue.400"
        color="white"
        p={3}
      >
        <Text fontWeight={700} fontSize="10pt">
          About community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex direction="column" borderRadius="0 0 4px 4px" bg="white" p={3}>
        <Stack>
          <Flex width="100%" fontSize="10pt" p={2} fontWeight={600}>
            <Flex direction="column" flexGrow={1}>
              <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
              <Text>Members</Text>
            </Flex>
            <Flex direction="column" flexGrow={1}>
              <Text>1</Text>
              <Text>Online</Text>
            </Flex>
          </Flex>
          <Divider />
          <Flex align="center" w="100%" fontWeight={500} fontSize="10pt">
            <Icon as={RiCakeLine} fontSize={18} mr={2} />
            {communityData.createdAt && (
              <Text pt={1}>{`Created ${moment(
                new Date(communityData.createdAt?.seconds * 1000)
              ).format("MMM DD, Y")}`}</Text>
            )}
          </Flex>
          <Link href={`/r/${communityData.id}/submit`}>
            <Button h="30px">Create post</Button>
          </Link>
          {user?.uid === communityData.creatorId && (
            <>
              <Divider />
              <Stack spacing={1} fontSize="10pt">
                <Text fontWeight={600}>Admin</Text>
                <Flex justify="space-between" align="center">
                  <Text
                    color="blue.500"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => selectedFileRef.current?.click()}
                  >
                    Change Image
                  </Text>
                  <Input
                    ref={selectedFileRef}
                    type="file"
                    hidden
                    onChange={handleSelectImage}
                  />
                  {communityData.imageURL || selectedFile ? (
                    <Image
                      borderRadius="full"
                      boxSize="40px"
                      src={selectedFile || communityData.imageURL}
                      alt="community image"
                    />
                  ) : (
                    <Icon
                      as={FaReddit}
                      fontSize="40px"
                      mr={2}
                      color="brand.100"
                    />
                  )}
                </Flex>
                {selectedFile &&
                  (uploadingImg ? (
                    <Spinner size="sm" />
                  ) : (
                    <Text
                      cursor="pointer"
                      _hover={{ textDecoration: "underline" }}
                      onClick={handleUpdateImage}
                    >
                      Save Changes
                    </Text>
                  ))}
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
};

export default About;
