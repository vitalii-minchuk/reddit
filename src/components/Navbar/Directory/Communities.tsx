import { FC, useState } from "react";
import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import CreateCommunityModal from "../../Modal/CreateCommunity";
import { useRecoilValue } from "recoil";
import { communityState } from "../../../atoms/communitiesAtom";
import { FaReddit } from "react-icons/fa";
import MenuListItem from "./MenuListItem";

const Communities: FC = () => {
  const [open, setOpen] = useState(false);
  const { mySnippets } = useRecoilValue(communityState);

  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Box px={3} mb={4}>
        <Text fontWeight={500} pl={3} mb={1} fontSize="7pt">
          MODERATING
        </Text>
        {mySnippets
          .filter((item) => item.isModerator)
          .map((snippet) => (
            <MenuListItem
              key={snippet.communityId}
              icon={FaReddit}
              imageURL={snippet.imageURL}
              displayText={`r/${snippet.communityId}`}
              link={`/r/${snippet.communityId}`}
              iconColor="brand.500"
            />
          ))}
      </Box>
      <Box px={3} mb={4}>
        <Text fontWeight={500} pl={3} mb={1} fontSize="7pt">
          MY COMMUNITIES
        </Text>
        <MenuItem
          w="100%"
          fontSize="10pt"
          _hover={{ bg: "gray.100" }}
          onClick={() => setOpen(true)}
        >
          <Flex align="center">
            <Icon fontSize={20} mr={2} as={GrAdd} />
            Create Community
          </Flex>
        </MenuItem>
        {mySnippets.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={FaReddit}
            imageURL={snippet.imageURL}
            displayText={`r/${snippet.communityId}`}
            link={`/r/${snippet.communityId}`}
            iconColor="brand.500"
          />
        ))}
      </Box>
    </>
  );
};

export default Communities;
