import { gql } from "@apollo/client"
import { DeleteIcon } from "@chakra-ui/icons"
import { Avatar, Box, Button, Center, Flex, FormControl, Heading, Icon, Input, InputGroup, InputRightElement, Link, Spacer, Spinner, Text } from "@chakra-ui/react"
import { useUser } from "@supabase/auth-helpers-react"
import { formatDistanceToNowStrict, parseISO } from "date-fns"
import { useForm } from "react-hook-form"
import { useCommentsQuery, useCreateCommentMutation, useRemoveCommentMutation } from "../../codegen/graphql"
import { getProfileDisplay } from "../utils/profileDisplay"
import { NextLink } from "./exportUtils"
import SignInPanel from "./signInPanel"

export const GET_COMMENT = gql`
  query comments( 
    $first: Int,
    $after: Cursor,
    $filter: CommentFilter
  ) {
    comments(
      first: $first,
      after: $after,
      filter: $filter
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          createdAt
          content
          commenter {
            id
            username
            fullname
            email
          }
        }
      }
    }
  }
`

export const CREATE_COMMENT = gql`
  mutation createComment($input: CreateCommentMutationInput!) {
    createComment(input: $input) {
      id
      createdAt
      content
      commenter {
        id
        username
        fullname
        email
      }
    }
  }
`

export const REMOVE_COMMENT = gql`
  mutation removeComment($input: RemoveCommentMutationInput!) {
    removeComment(input: $input) {
      id
      createdAt
      content
      commenter {
        id
        username
        fullname
        email
      }
    }
  }
`

type FormValues = {
  content: string
}

const CommentList = ({ postId }: { postId: string}) => {
  const { user } = useUser()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormValues>()

  const { data, loading, refetch } = useCommentsQuery({
    variables: {
      first: 100,
      filter: {
        postId
      }
    }
  })

  const [createComment] = useCreateCommentMutation()
  const [removeComment] = useRemoveCommentMutation()

  const onSubmit = async (value: FormValues) => {
    await createComment({
      variables: {
        input: {
          postId,
          content: value.content
        }
      }
    })
    await refetch()
    reset()
  }

  const onRemove = async (id: string) => {
    await removeComment({
      variables: {
        input: {
          id
        }
      }
    })
    await refetch()
  }
  
  const comments = data?.comments?.edges.map(edge => edge.node) ?? []

  return <Flex p={{ base: 4, lg: 8 }} gap={{ base: 2, lg: 4 }} direction='column'>
    <Heading size='md'>評論</Heading>
    {loading && <Center><Spinner size='lg'/></Center>}
    <Flex mt='2' mb='2' gap='8px' direction='column'>
      {comments.map(comment => {
        return comment.commenter && <Flex key={comment.id} gap='12px'>
          <Avatar mt='1' size='sm' name={getProfileDisplay(comment.commenter)?.[0]} />
          <Flex flex='1' direction='column' gap='4px'>
            <Flex>
              <NextLink href={`/profile/${comment.commenter?.id}`}>
                <Link>
                  <Text fontWeight='bold'>{getProfileDisplay(comment.commenter)}</Text>
                </Link>
              </NextLink>
              <Spacer />
              <Text color='GrayText'>{formatDistanceToNowStrict(parseISO(comment.createdAt.toString()))}</Text>
            </Flex>
            <Flex>
              <Text>{comment.content}</Text>
              <Spacer />
              {comment.commenter?.id === user?.id && <Link>
                <Icon onClick={() => onRemove(comment.id)} as={DeleteIcon}></Icon>
              </Link>}
            </Flex>
          </Flex>
        </Flex>
      })}
      {comments.length === 0 && <Center>No comments yet.</Center>}
    </Flex>
    {user 
      ? <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.content}>
          <InputGroup size='md'>
            <Input
              id='content'
              placeholder='content'
              {...register('content', {
                required: 'This is required'
              })}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='xs' type='submit'>
                Submit
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>
      : <Box>
        <Text>評論請先登入</Text>
        <SignInPanel />
      </Box>
    }
  </Flex>
}

export default CommentList