import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
} from '@chakra-ui/react'
import { gql } from '@apollo/client'
import { NextPage } from 'next'
import { useCreatePostMutation, PostInsertInput } from '../../codegen/graphql'
import { useUser } from '@supabase/auth-helpers-react'

export const CREATE_POST = gql`
  mutation createPost($input: PostInsertInput!) {
    insertIntoPostCollection(objects: [$input]) {
      affectedCount
      records {
        id
      }
    }
  }
`

const PostCreate: NextPage = () => {
  const { user } = useUser()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const [createPostMutation, { loading, error }] = useCreatePostMutation()

  if (loading) return <Box>Submitting...</Box>
  if (error) return <Box>Submission error! ${error.message}</Box>

  const onSubmit = async (value: PostInsertInput) => {
    await createPostMutation({
      variables: {
        input: {
          posterId: user?.id,
          title: value.title,
          url: value.url
        }
      }
    })
  }

  return (
    <Box m='3'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.title}>
          <FormLabel htmlFor='title'>Title</FormLabel>
          <Input
            id='title'
            placeholder='title'
            {...register('title', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.url}>
          <FormLabel htmlFor='url'>Url</FormLabel>
          <Input
            id='url'
            placeholder='url'
            {...register('url', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} isLoading={isSubmitting} type='submit'>
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default PostCreate