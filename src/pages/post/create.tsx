import { gql } from '@apollo/client'
import {
  Box, Button, Center, FormControl, FormErrorMessage,
  FormLabel, Heading, Input
} from '@chakra-ui/react'
import { useUser } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useCreatePostMutation } from '../../../codegen/graphql'

type FormValues = {
  title: string
  url: string
}

export const ADD_POST = gql`
  mutation createPost($input: CreatePostMutationInput!) {
    createPost(input: $input) {
      id
    }
  }
`

const PostCreate: NextPage = () => {
  const router = useRouter()
  const { user } = useUser()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  const [createPost, { loading, error }] = useCreatePostMutation()

  if (!user) return <Center p='30px'>You need to sign in first ☝</Center>
  if (loading) return <Box>Submitting...</Box>
  if (error) return <Box>Submission error! ${error.message}</Box>

  const onSubmit = async (value: FormValues) => {
    await createPost({
      variables: {
        input: {
          title: value.title,
          url: value.url
        }
      }
    })
    router.push('/post')
  }

  return (
    <Box p='3'>
      <Heading size='md'>Create Post</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt='4' isInvalid={!!errors.url}>
          <FormLabel htmlFor='url'>Url</FormLabel>
          <Input
            id='url'
            placeholder='url'
            {...register('url', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
              pattern: { value: /^((?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_+.~#?&/=]*|)$/, message: 'Please enter a valid url'}
            })}
          />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt='4' isInvalid={!!errors.title}>
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
        <Button mt={4} isLoading={isSubmitting} type='submit'>
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default PostCreate