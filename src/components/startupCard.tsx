import { gql } from "@apollo/client"
import { Avatar, Flex, Heading, Text } from "@chakra-ui/react"
import { StartupCardFragment } from "../../codegen/graphql"

export const STARTUP_CARD = gql`
  fragment StartupCard on Startup {
    id
    logo
    name
    url
  }
`

const StartupCard = (props: { startup: StartupCardFragment }) => {
  const { startup } = props
  
  return <Flex 
    width='100%'
    bg='white' 
    p={{ base: '2', lg: '5' }} 
    gap={{ base: '2', lg: '4' }}
    borderRadius='lg' 
    boxShadow='0px 0px 15px rgba(0, 0, 0, 0.1)'
    direction='column'
  >
    <Flex gap={{ base: '2', lg: '3' }} alignItems='center'>
      <Avatar size={{ base: 'sm', lg: 'md' }} name={startup.logo || ''} />
      <Flex direction='column'>
        <Heading size={{ base: 'sm', lg: 'md' }}>{startup.name}</Heading>
        <Text>{startup.url}</Text>
      </Flex>
    </Flex>
  </Flex>
}

export default StartupCard