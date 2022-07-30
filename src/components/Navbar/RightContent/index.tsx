import { FC } from "react"

import { Flex } from "@chakra-ui/react"
import AuthButtons from "./AuthButtons"

const RightContent: FC = () => {
  return (
    <>
    {/* <AuthModal /> */}
      <Flex justify="center" align={"center"}>
        <AuthButtons />
      </Flex>
    </>
  )
}

export default RightContent