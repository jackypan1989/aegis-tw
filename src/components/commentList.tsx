import { gql } from "@apollo/client"
import { Box, Button, Flex, FormControl, Input, InputGroup, InputRightElement, Spacer, Text } from "@chakra-ui/react"
import { formatDistanceToNowStrict, parseISO } from "date-fns"
import { useForm } from "react-hook-form"
import { useCommentsQuery, useCreateCommentMutation, useRemoveCommentMutation } from "../../codegen/graphql"

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
      }
    }
  }
`

type FormValues = {
  content: string
}

const CommentList = ({ postId }: { postId: string}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>()

  const { data, refetch } = useCommentsQuery({
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

  return <Box p='12px'>
    {comments.map(comment => {
      return <Flex key={comment.id} direction='column'>
        <Flex>
          <Text fontWeight='bold'>{comment.commenter?.username}</Text>
          <Spacer />
          <Text>{formatDistanceToNowStrict(parseISO(comment.createdAt.toString()))}</Text>
        </Flex>
        <Flex>
          <Text>{comment.content}</Text>
          <Spacer />
          <Text onClick={() => onRemove(comment.id)}>Remove</Text>
        </Flex>
        
      </Flex>
    })}
    <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button h='1.75rem' size='sm' type='submit'>
              Submit
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </form>
  </Box>
}

export default CommentList