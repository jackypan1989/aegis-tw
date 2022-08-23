import { gql } from "@apollo/client"
import { Avatar, Flex, Heading, Link, Spacer, Tag, Text, Wrap, WrapItem } from "@chakra-ui/react"
import { StartupCardFragment } from "../../codegen/graphql"
import { getEnumString } from "../utils/getEnumString"
import { NextLink } from "./exportUtils"

export const STARTUP_CARD = gql`
  fragment StartupCard on Startup {
    id
    logo
    name
    url
    valuation
    markets
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
  >
    <Avatar size={{ base: 'sm', lg: 'md' }} src={startup.logo || undefined} name={startup.logo || ''} />
    <Flex gap={{ base: '2', lg: '3' }} direction='column' flex='1'>
      <Flex>
        <NextLink href={`/startup/${startup.id}`}>
          <Link>
            <Heading size={{ base: 'md', lg: 'md' }}>{startup.name}</Heading>
          </Link>
        </NextLink>
        <Spacer />
        <Heading size={{ base: 'md', lg: 'md' }}>{startup.valuation ? `$${Intl.NumberFormat('en', { notation: 'compact' }).format(startup.valuation)}` : ''}</Heading>
      </Flex>
      {startup.url && <Link href={startup.url} target='_blank'><Text>{startup.url}</Text></Link>}
      <Wrap>
        {startup.markets.map(market => <WrapItem key={market}>
          <Tag size='sm' colorScheme='purple'>
            {getEnumString(market)}
          </Tag>
        </WrapItem>)}
      </Wrap>
    </Flex>
  </Flex>
}

export default StartupCard