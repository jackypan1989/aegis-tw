import { gql } from "@apollo/client"
import { Button, Flex, Text } from "@chakra-ui/react"
import { NextLink } from "./exportUtils"

export const GET_STATS = gql`
  query getStats {
    stats {
      profileCount
    }
  }
`

const Banner = () => {
  // const { data } = useGetStatsQuery()
  // const profileCount = data?.stats?.profileCount

  return <Flex px='3' py='2' gap='2' bg='purple.400' color='white' justifyContent='center' alignItems='center'>
    <Text as='span'>你正在尋找創業夥伴？天使投資人？新創公司職缺？</Text>
    <NextLink href="/auth/signIn">
      <Button colorScheme='blackAlpha'>加入社群</Button>
    </NextLink>
  </Flex>
}

export default Banner