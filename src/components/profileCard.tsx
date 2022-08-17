import { gql } from "@apollo/client"
import { Avatar, Flex, Heading, Icon, Link, Tag, Text, Wrap, WrapItem } from "@chakra-ui/react"
import { AiFillFacebook, AiFillGithub, AiFillLinkedin, AiFillTwitterSquare, AiOutlineLink, AiOutlineMail } from 'react-icons/ai'
import { ProfileCardFragment } from "../../codegen/graphql"
import { getEnumString } from "../utils/getEnumString"

export const PROFILE_CARD = gql`
  fragment ProfileCard on Profile {
    id
    email
    username
    fullname
    roles
    markets
    avatarUrl
    website
    linkedin
    facebook
    twitter
    github
  }
`

const ProfileCard = (props: { profile: ProfileCardFragment }) => {
  const { profile } = props
  const hasRoles = profile.roles.length > 0
  const hasMarkets = profile.markets.length > 0

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
      <Avatar size={{ base: 'sm', lg: 'md' }} name={profile.username?.[0]} />
      <Flex direction='column'>
        <Heading size={{ base: 'sm', lg: 'md' }}>{profile.fullname || profile.email}</Heading>
        <Text>@{profile.username}</Text>
      </Flex>
    </Flex>
    {hasRoles && hasMarkets && <Flex direction='column' gap='8px'>
      {hasRoles && 
        <Wrap>
          {profile.roles.map(role => <WrapItem key={role}>
            <Tag size='sm' colorScheme='blue'>
              {getEnumString(role)}
            </Tag>
          </WrapItem>)}
        </Wrap>
      }
      {hasMarkets && 
        <Wrap>
          {profile.markets.map(market => <WrapItem key={market}>
            <Tag size='sm' colorScheme='purple'>
              {getEnumString(market)}
            </Tag>
          </WrapItem>)}
        </Wrap>
      }
    </Flex>}
    <Wrap>
      {profile.email && <WrapItem>
        <Link href={`mailto:${profile.email}`}>
          <Icon boxSize={6} as={AiOutlineMail}></Icon>
        </Link>
      </WrapItem>}
      {profile.website && <WrapItem>
        <Link href={profile.website} target='_new'>
          <Icon boxSize={6} as={AiOutlineLink}></Icon>
        </Link>
      </WrapItem>}
      {profile.linkedin && <WrapItem>
        <Link href={profile.linkedin} target='_new'>
          <Icon boxSize={6} as={AiFillLinkedin}></Icon>
        </Link>
      </WrapItem>}
      {profile.facebook && <WrapItem>
        <Link href={profile.facebook} target='_new'>
          <Icon boxSize={6} as={AiFillFacebook}></Icon>
        </Link>
      </WrapItem>}
      {profile.twitter && <WrapItem>
        <Link href={profile.twitter} target='_new'>
          <Icon boxSize={6} as={AiFillTwitterSquare}></Icon>
        </Link>
      </WrapItem>}
      {profile.github && <WrapItem>
        <Link href={profile.github} target='_new'>
          <Icon boxSize={6} as={AiFillGithub}></Icon>
        </Link>
      </WrapItem>}
    </Wrap>
  </Flex>
}

export default ProfileCard