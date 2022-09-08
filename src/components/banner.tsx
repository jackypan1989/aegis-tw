import { gql } from "@apollo/client"
import { Button, Flex, Text } from "@chakra-ui/react"
import { useGetStatsQuery } from "../../codegen/graphql"
import { NextLink } from "./exportUtils"

export const GET_STATS = gql`
  query getStats {
    stats {
      profileCount
    }
  }
`

const Banner = () => {
  const { data } = useGetStatsQuery()
  const profileCount = data?.stats?.profileCount

  return <Flex p='2' gap='2' bg='purple.400' color='white' justifyContent='center' alignItems='center'>
    <Text as='span'>尋找創業夥伴？尋找投資人？尋找新創工作？目前已有 { profileCount } 位海內外台灣軟體人，加入 Aegis 人脈網路</Text>
    <NextLink href="/auth/signIn">
      <Button colorScheme='blackAlpha'>點此加入</Button>
    </NextLink>
  </Flex>
}

export default Banner