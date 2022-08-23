import { DocumentNode, gql } from '@apollo/client'
import { DeleteIcon, TriangleUpIcon } from '@chakra-ui/icons'
import { Box, Button, Center, Flex, Icon, Link, Text, useToast } from '@chakra-ui/react'
import { useUser } from '@supabase/auth-helpers-react'
import { formatDistanceToNowStrict, parseISO } from 'date-fns'
import { useRouter } from 'next/router'
import { BiMessageAdd, BiUser } from 'react-icons/bi'
import URI from 'urijs'
import { PostCardFragment, useCreateVoteMutation, useRemovePostMutation, useRemoveVoteMutation, useViewPostMutation } from '../../codegen/graphql'
import { NextLink } from "./exportUtils"

export const POST_CARD = gql`
  fragment PostCard on Post {
    id
    createdAt
    title
    url
    content
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

export const REMOVE_POST = gql`
  mutation removePost($input: RemovePostMutationInput!) {
    removePost(input: $input) {
      id
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
  mutation removeVote($input: RemoveVoteMutationInput!) {
    removeVote(input: $input) {
      id
      post {
        id
        isVoted
      }
    }
  }
`

export const VIEW_POST = gql`
  mutation viewPost($input: ViewPostMutationInput!) {
    viewPost(input: $input) {
      id
      viewCount
    }
  }
`

const PostCard = (props: { post: PostCardFragment, showContent?: boolean, refetchQuery: DocumentNode }) => {
  const { post, showContent, refetchQuery } = props
  const toast = useToast()
  const router = useRouter()
  const { user } = useUser()

  const [createVote] = useCreateVoteMutation({
    refetchQueries: [
      { 
        query: refetchQuery,
        variables: {
          first: 15
        }
      }
    ]
  })
  
  const [removeVote] = useRemoveVoteMutation({
    refetchQueries: [
      { 
        query: refetchQuery,
        variables: {
          first: 15
        }
      }
    ]
  })

  const [viewPost] = useViewPostMutation({
    refetchQueries: [
      { 
        query: refetchQuery,
        variables: {
          first: 15
        }
      }
    ]
  })

  const [removePost] = useRemovePostMutation({
    variables: {
      input: {
        id: post.id
      }
    }
  })

  const onView = async () => {
    await viewPost({
      variables: {
        input: {
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
            input: {
              postId: post.id
            }
          }
        })

        toast({
          position: 'bottom-left',
          status: 'success',
          title: 'Successfully unvoted post.'
        })
      } else {
        await createVote({
          variables: {
            input: {
              postId: post.id
            }
          }
        })

        toast({
          position: 'bottom-left',
          status: 'success',
          title: 'Successfully voted post.'
        })
      } 
    } else {
      toast({
        position: 'bottom-left',
        status: 'info',
        title: 'You need to sign in first.'
      })
    }
  }

  const onRemove = async () => {
    await removePost()
    router.push('/post')
  }

  return <Flex 
    width='100%'
    bg='white' 
    p={{ base: '2', lg: '5' }} 
    gap={{ base: '2', lg: '4' }}
    borderRadius={{ base: 'none', lg: 'lg' }}
    boxShadow='0px 0px 15px rgba(0, 0, 0, 0.1)'
  >
    <Flex direction='column' w='30px' alignItems='center'>
      <Link>
        <TriangleUpIcon m='8px' onClick={onVote} color={post.isVoted ? 'black' : 'gray.300'} />
      </Link>
      <Center>{post.voteCount}</Center>
    </Flex>
    <Flex flex='1'>
      <Flex flex='1' 
        direction='column' 
        gap={{ base: '2', lg: '4' }} 
      >
        <Flex gap='4px'>
          <Box flex='1'>
            {post.url 
              ? <Link href={post.url} target='_new' onClick={onView}>
                  <Box>
                    <Text fontSize={{ base: 'sm', lg: 'md' }} fontWeight='bold' display='inline'>{post.title}</Text>
                    <Text display='inline' size='8' ml='1' color='gray'>{`(${new URI(post.url).domain()})`}</Text>
                  </Box>
                </Link>
              : <Box>
                  <Text fontSize={{ base: 'sm', lg: 'md' }} fontWeight='bold' display='inline'>{post.title}</Text>
                </Box>
            }
          </Box>
          <Box display={{ base: 'none', lg: 'initial' }} lineHeight='2' justifyContent='flex-end'>
            <Text fontSize='xs' color='gray'>{formatDistanceToNowStrict(parseISO(post.createdAt.toString()))}</Text>
          </Box> 
        </Flex>
        <Flex fontSize='sm' fontWeight='thin' gap='8px' alignItems='center'>
          <NextLink href={`/post/${post.id}`}>
            <Button size='sm' borderRadius='100px' bg='blackAlpha.50' fontWeight='normal' leftIcon={<Icon boxSize='18px' as={BiMessageAdd}/>}>
            {post.commentCount}
          </Button>
          </NextLink>
          <NextLink href={`/profile/${post.poster?.id}`}>
            <Button size='sm' borderRadius='100px' bg='blackAlpha.50' fontWeight='normal' leftIcon={<Icon boxSize='18px' as={BiUser}/>}>
              {post.poster?.username}
            </Button>
          </NextLink>
          {post.poster?.id === user?.id && 
            <Link>
              <Icon onClick={onRemove} as={DeleteIcon}></Icon>
            </Link>
          }
        </Flex>
        {showContent && post.content && <Box>
          <Text>{post.content.split('\n').map((s, val) => <Box key={val}>{s}</Box>)}</Text>
        </Box>}
      </Flex>
    </Flex>
  </Flex>
}

export default PostCard
