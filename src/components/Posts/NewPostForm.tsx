import { ChangeEvent, FC, useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  Icon,
  Text,
} from "@chakra-ui/react";
import { IoDocumentText, IoImageOutline } from "react-icons/io5";
import { BsLink45Deg, BsMic } from "react-icons/bs";
import { BiPoll } from "react-icons/bi";
import TabItem from "./TabItem";
import TextInputs from "./PostForm/TextInputs";
import ImageUpload from "./PostForm/ImageUpload";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore, storage } from "../../firebase/clientApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const formTabs = [
  {
    title: "Post",
    icon: IoDocumentText,
  },
  {
    title: "Images & Video",
    icon: IoImageOutline,
  },
  {
    title: "Link",
    icon: BsLink45Deg,
  },
  {
    title: "Poll",
    icon: BiPoll,
  },
  {
    title: "Talk",
    icon: BsMic,
  },
];

export type TabItem = {
  title: string;
  icon: typeof Icon.arguments;
};

interface INewPoetForm {
  user: User;
}

const NewPostForm: FC<INewPoetForm> = ({ user }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [selectedFile, setSelectedFile] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [textInputs, setTextInputs] = useState({
    title: "",
    body: "",
  });

  const handleCreatePost = async () => {
    const { communityId } = router.query;
    setLoading(true);
    try {
      const postDocRef = await addDoc(collection(firestore, "posts"), {
        communityId: communityId as string,
        creatorId: user.uid,
        creatorDisplayName: user.email!.split("@")[0],
        body: textInputs.body,
        title: textInputs.title,
        numberOfComments: 0,
        voteStatus: 0,
        createdAt: serverTimestamp() as Timestamp,
      });
      if (selectedFile) {
        const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
        await uploadString(imageRef, selectedFile, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(postDocRef, {
          imageURL: downloadURL,
        });
      }
      router.back();
    } catch (error) {
      console.log(error);
      setError("Error creating post");
    }
    setLoading(false);
  };

  const handleSelectImage = (event: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  const handleTextChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { name, value },
    } = event;
    setTextInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!error) return
    const timer = setTimeout(() => {
      setError("");
    }, 4000);

    return () => clearTimeout(timer);
  }, [error]);

  return (
    <Flex direction="column" mt={2} borderRadius={4} bg="white">
      <Flex w="100%">
        {formTabs.map((item) => (
          <TabItem
            key={item.title}
            item={item}
            selected={item.title === selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </Flex>
      <Flex p={4}>
        {selectedTab === "Post" && (
          <TextInputs
            onChange={handleTextChange}
            handleCreatePost={handleCreatePost}
            textInputs={textInputs}
            loading={loading}
          />
        )}
        {selectedTab === "Images & Video" && (
          <ImageUpload
            setSelectedFile={setSelectedFile}
            setSelectedTab={setSelectedTab}
            selectedFile={selectedFile}
            handleSelectImage={handleSelectImage}
          />
        )}
        {selectedTab !== "Images & Video" && selectedTab !== "Post" && (
          <Box w="100%" h="180px" display="grid" placeContent="center">
            <Text>This section is empty yet</Text>
          </Box>
        )}
      </Flex>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
    </Flex>
  );
};

export default NewPostForm;
