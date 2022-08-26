import { gql } from "@apollo/client"
import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react"
import { useGetStatsQuery } from "../../codegen/graphql"
import { NextLink } from "../components/exportUtils"

export const GET_STATS = gql`
  query getStats {
    stats {
      profileCount
    }
  }
`

const Home = () => {
  const { data } = useGetStatsQuery()
  const profileCount = data?.stats?.profileCount

  return <Flex p={{ base: 4, lg: 8 }} direction='column' alignItems='center' gap={{ base: 2, lg: 4 }}>
    <Image 
      boxSize='sm'
      objectFit='cover'
      src='https://3.bp.blogspot.com/-VmsLRaXpUbk/Wov1X5GazSI/AAAAAAABKbw/F4-_wAO4-UsT1-6NNfUp13db3rwc11fnACLcBGAs/s800/internet_influencer_figure.png' 
      alt='hero' 
    />
    <Heading size='lg'>
      已有 {profileCount} 位來自海內外的台灣人
    </Heading>
    <Heading size='lg'>
      加入 Aegis Community
    </Heading>
    <Box mt='2'>
      <NextLink href="/about">
        <Button >為什麼?
        </Button>
      </NextLink>
      <NextLink href="/auth/signIn">
        <Button ml={3}>立即加入</Button>
      </NextLink>
    </Box>
  </Flex>
}

export default Home