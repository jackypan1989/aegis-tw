import { gql } from "@apollo/client"
import { Center, Spinner } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useGetStartupQuery } from "../../../codegen/graphql"
import StartupCard, { STARTUP_CARD } from "../../components/startupCard"

export const GET_STARTUP = gql`
  ${STARTUP_CARD}

  query getStartup($id: ID!) {
    startup(id: $id) {
      ...StartupCard
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

  return <StartupCard startup={startup}></StartupCard>
}

export default StartupDetail