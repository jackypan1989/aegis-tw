import { gql } from "@apollo/client"
import { Center, Flex, Spinner, Stat, StatGroup, StatLabel, StatNumber, Text } from "@chakra-ui/react"
import { format, parseISO } from "date-fns"
import { useRouter } from "next/router"
import { useGetStartupQuery } from "../../../codegen/graphql"
import StartupCard, { STARTUP_CARD } from "../../components/startupCard"

export const GET_STARTUP = gql`
  ${STARTUP_CARD}

  query getStartup($id: ID!) {
    startup(id: $id) {
      ...StartupCard
      description
      foundedAt
      funding
      valuation
      teamSize
      revenue
      dau
    }
  }
`

// export const UPDATE_STARTUP = gql`
//   ${STARTUP_CARD}

//   mutation updateStartup($input: UpdateStartupMutationInput!) {
//     updateStartup(input: $input) {
//       ...StartupCard
//     }
//   }
// `

const StartupDetail = () => {
  const router = useRouter()
  const id = router.query.id as string
  const { data, loading } = useGetStartupQuery({
    variables: {
      id: id
    }
  })

  const startup = data?.startup
  if (loading) return <Center h='80vh'><Spinner size='lg'/></Center>
  if (!startup) return <Center h='80vh'>Can not find this startup.</Center>

  return <Flex direction='column' gap={{ base: 3, lg: 6 }}>
    <StartupCard startup={startup} />
    <StatGroup p={{ base: 2, lg: 3 }}>
      <Stat>
        <StatLabel>Found At</StatLabel>
        <StatNumber>{format(parseISO(startup.foundedAt.toString()), 'yyyy-MM')}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Valuation(USD)</StatLabel>
        <StatNumber>{startup.revenue ? `$${Intl.NumberFormat('en', { notation: 'compact' }).format(startup.valuation)}` : '-'}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Funding(USD)</StatLabel>
        <StatNumber>{startup.revenue ? `$${Intl.NumberFormat('en', { notation: 'compact' }).format(startup.funding)}` : '-'}</StatNumber>
      </Stat>
    </StatGroup>
    <StatGroup p={{ base: 2, lg: 3 }}>
      <Stat>
        <StatLabel>Team Size</StatLabel>
        <StatNumber>{startup.teamSize ?? '-'}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Annual Revenue</StatLabel>
        <StatNumber>{startup.revenue ? `$${Intl.NumberFormat('en', { notation: 'compact' }).format(startup.revenue)}` : '-'}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Daily Active User</StatLabel>
        <StatNumber>{startup.dau ?? '-'}</StatNumber>
      </Stat>
    </StatGroup>
    <Stat p={{ base: 2, lg: 3 }}>
      <StatLabel>Description</StatLabel>
      <Text mt='1'>{startup.description}</Text>
    </Stat>
  </Flex>
  
  
}

export default StartupDetail