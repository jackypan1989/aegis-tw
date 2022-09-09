import { gql } from '@apollo/client'
import {
  Box, Button, Center, FormControl, FormErrorMessage,
  FormLabel, Heading, Input, Text, useToast
} from '@chakra-ui/react'
import { useUser } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useCreatePostMutation, useGetUrlMetadataMutation } from '../../../codegen/graphql'
import { AutoResizeTextarea } from '../../components/autoResizeTextarea'
import SignInPanel from '../../components/signInPanel'

type FormValues = {
  title: string
  url: string
  content: string
}

export const ADD_POST = gql`
  mutation createPost($input: CreatePostMutationInput!) {
    createPost(input: $input) {
      id
    }
  }
`

export const GET_URL_METADATA = gql`
  mutation getUrlMetadata($input: GetUrlMetadataInput!) {
    getUrlMetadata(input: $input) {
      url
      title
    }
  }
`

const PostCreate: NextPage = () => {
  const toast = useToast()
  const router = useRouter()
  const { user } = useUser()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    getValues
  } = useForm<FormValues>()

  const [createPost, { loading, error }] = useCreatePostMutation()
  const [getUrlMetadata] = useGetUrlMetadataMutation()

  if (!user) return <Center p={{ base: 4, lg: 10 }}><SignInPanel /></Center>
  if (loading) return <Center p={{ base: 4, lg: 10 }}>Submitting...</Center>
  if (error) return <Center p={{ base: 4, lg: 10 }}>Submission error! ${error.message}</Center>

  const onSubmit = async (value: FormValues) => {
    await createPost({
      variables: {
        input: {
          title: value.title,
          url: value.url,
          content: value.content
        }
      }
    })
    toast({
      position: 'bottom-left',
      status: 'success',
      title: 'Successfully created post.'
    })
    router.push('/post')
  }

  const onChangeUrl = async () => {
    const res = await getUrlMetadata({
      variables: {
        input: {
          url: getValues().url
        }
      }
    })
      
    setValue("title", res.data?.getUrlMetadata?.title ?? '')
  }

  return (
    <Box p={{ base: 4, lg: 8 }}>
      <Heading size='lg'>發表文章</Heading>
      <Text mt='4'>你可以純粹發表文章(以網址留白方式)，或貼上外部網站超連結(自動抓取標題)，標題含有求職關鍵字會同步加入到求職區塊</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt='4' isInvalid={!!errors.url}>
          <FormLabel htmlFor='url'>Url</FormLabel>
          <Input
            id='url'
            placeholder='url'
            {...register('url', {
              onChange: onChangeUrl,
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
              required: 'This is required'
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mt='4' isInvalid={!!errors.content}>
          <FormLabel htmlFor='content'>Content</FormLabel>
          <AutoResizeTextarea
            id='content'            
            placeholder='content'
            {...register('content')}
          />
        </FormControl>
        <Button mt={4} isLoading={isSubmitting} type='submit'>
          送出
        </Button>
      </form>
    </Box>
  )
}

export default PostCreate