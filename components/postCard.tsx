import { gql } from '@apollo/client'
import { TriangleUpIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Flex, Heading, Icon, Link, Text } from '@chakra-ui/react'
import { useUser } from '@supabase/auth-helpers-react'
import { formatDistanceToNowStrict, parseISO } from 'date-fns'
import { BiMessageAdd, BiUser } from 'react-icons/bi'
import { PostCardFragment, useCreateVoteMutation, useDeleteVoteMutation } from '../codegen/graphql'

export const POST_CARD = gql`
  fragment PostCard on Post {
    id
    createdAt
    title
    url
    voteCount
    commentCount
    rankingScore
    poster {
      id
      username
    }
    voteCollection (
      filter: $voteFilter
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          direction
        }
      }
    }
  }
`

export const CREATE_VOTE = gql`
  mutation createVote($input: VoteInsertInput!) {
    insertIntoVoteCollection(objects: [$input]) {
      affectedCount
      records {
        id
      }
    }
  }
`

export const DELETE_VOTE = gql`
  mutation deleteVote($filter: VoteFilter!) {
    deleteFromVoteCollection(filter: $filter) {
      affectedCount
      records {
        id
      }
    }
  }
`

const PostCard = (props: { post: PostCardFragment }) => {
  const { post } = props
  const { user } = useUser()
  const [createVoteMutation, { loading: loading1, error: error1 }] = useCreateVoteMutation()
  const [deleteVoteMutation, { loading: loading2, error: error2 }] = useDeleteVoteMutation()

  const onVote = async () => {
    if (post.voteCollection?.edges.length === 0) {
      await createVoteMutation({
        variables: {
          input: {
            postId: post.id,
            voterId: user?.id,
            direction: 1
          }
        }
      })
    } else {
      await deleteVoteMutation({
        variables: {
          filter: {
            postId: {
              eq: post.id,
            },
            voterId: {
              eq: user?.id,
            }
          }
        }
      })
    } 
  }

  return <Flex w='800px' bg='white' p='8px 16px' borderRadius='lg' boxShadow='0px 0px 15px rgba(0, 0, 0, 0.1)' gap='20px'>
    <Flex direction='column' w='32px' alignItems='center'>
      <TriangleUpIcon m='8px'onClick={onVote}/>
      <Center>{post.voteCount}</Center>
    </Flex>
    <Flex flex='1' pt='12px'>
      <Flex flex='1' direction='column' gap='12px'>
        {post.url 
          ? <Link href={post.url} target='_new'>
              <Box>
                <Heading size='sm' display='inline'>{post.title}</Heading>
                <Text display='inline' size='8' ml='1' color='gray'>{`(${new URL(post.url).hostname})`}</Text>
              </Box>
            </Link>
          : <Box>
              <Heading size='sm' display='inline'>{post.title}</Heading>
            </Box>
        }
        <Flex fontSize='sm' fontWeight='thin' gap='8px'>
          <Button size='sm' borderRadius='100px' bg='blackAlpha.50' fontWeight='normal' leftIcon={<Icon boxSize='18px' as={BiMessageAdd}/>}>
            {post.commentCount} Comments
          </Button>
          <Button size='sm' borderRadius='100px' bg='blackAlpha.50' fontWeight='normal' leftIcon={<Icon boxSize='18px' as={BiUser}/>}>
            {post.poster?.username}
          </Button>
        </Flex>
      </Flex>
      <Flex w='100px' justifyContent='flex-end'>
        <Text fontSize='xs' color='gray'>{formatDistanceToNowStrict(parseISO(post.createdAt))}</Text>
      </Flex> 
    </Flex>
  </Flex>
}

export default PostCard