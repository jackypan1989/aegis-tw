import { gql } from '@apollo/client'
import { TriangleUpIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Flex, Heading, Icon, Link, Text } from '@chakra-ui/react'
import { useUser } from '@supabase/auth-helpers-react'
import { formatDistanceToNowStrict, parseISO } from 'date-fns'
import { BiMessageAdd, BiUser } from 'react-icons/bi'
import { PostCardFragment, useCreateVoteMutation, useRemoveVoteMutation, useViewPostMutation } from '../../codegen/graphql'
import { LIST_POST } from '../pages/post'

export const POST_CARD = gql`
  fragment PostCard on Post {
    id
    createdAt
    title
    url
    viewCount
    voteCount
    commentCount
    rankingScore
    isVoted
    poster {
      id
      username
    }
  }
`

export const CREATE_VOTE = gql`
  mutation createVote($input: CreateVoteMutationInput!) {
    createVote(input: $input) {
      id
      post {
        id
        isVoted
      }
    }
  }
`

export const REMOVE_VOTE = gql`
  mutation removeVote($filter: VoteFilter!) {
    removeVote(filter: $filter) {
      id
      post {
        id
        isVoted
      }
    }
  }
`

export const VIEW_POST = gql`
  mutation viewPost($filter: PostFilter!) {
    viewPost(filter: $filter) {
      id
      viewCount
    }
  }
`

const PostCard = (props: { post: PostCardFragment }) => {
  const { post } = props
  const { user } = useUser()

  const [createVote] = useCreateVoteMutation({
    refetchQueries: [
      { 
        query: LIST_POST,
        variables: {
          first: 30
        }
      }
    ]
  })
  
  const [removeVote] = useRemoveVoteMutation({
    refetchQueries: [
      { 
        query: LIST_POST,
        variables: {
          first: 30
        }
      }
    ]
  })

  const [viewPost] = useViewPostMutation({
    refetchQueries: [
      { 
        query: LIST_POST,
        variables: {
          first: 30
        }
      }
    ]
  })

  const onView = async () => {
    await viewPost({
      variables: {
        filter: {
          id: post.id
        }
      }
    })
  }

  const onVote = async () => {
    if (user) {
      if (post.isVoted) {
        await removeVote({
          variables: {
            filter: {
              postId: post.id,
              voterId: user.id
            }
          }
        })
      } else {
        await createVote({
          variables: {
            input: {
              postId: post.id,
              voterId: user.id
            }
          }
        })
      } 
    }
  }

  return <Flex w='100vw' p='8px' bg='white' gap='8px' borderRadius='lg' boxShadow='0px 0px 15px rgba(0, 0, 0, 0.1)'>
    <Flex direction='column' w='30px' alignItems='center'>
      <TriangleUpIcon m='8px' onClick={onVote} color={post.isVoted ? 'black' : 'gray.300'} />
      <Center>{post.voteCount}</Center>
    </Flex>
    <Flex flex='1'>
      <Flex flex='1' direction='column' gap='12px'>
        <Flex>
          <Box flex='1'>
            {post.url 
              ? <Link href={post.url} target='_new' onClick={onView}>
                  <Box>
                    <Heading size='sm' display='inline'>{post.title}</Heading>
                    <Text display='inline' size='8' ml='1' color='gray'>{`(${new URL(post.url).hostname})`}</Text>
                  </Box>
                </Link>
              : <Box>
                  <Heading size='sm' display='inline'>{post.title}</Heading>
                </Box>
            }
          </Box>
          <Box justifyContent='flex-end'>
            <Text fontSize='xs' color='gray'>{formatDistanceToNowStrict(parseISO(post.createdAt.toString()))}</Text>
          </Box> 
        </Flex>
        <Flex fontSize='sm' fontWeight='thin' gap='8px'>
          <Button size='sm' borderRadius='100px' bg='blackAlpha.50' fontWeight='normal' leftIcon={<Icon boxSize='18px' as={BiMessageAdd}/>}>
            {post.commentCount}
          </Button>
          <Button size='sm' borderRadius='100px' bg='blackAlpha.50' fontWeight='normal' leftIcon={<Icon boxSize='18px' as={BiUser}/>}>
            {post.poster?.username}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  </Flex>
}

export default PostCard
