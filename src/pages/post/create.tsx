import { gql } from '@apollo/client'
import {
  Box, Button, Center, FormControl, FormErrorMessage,
  FormLabel, Heading, Input, Text, useToast
} from '@chakra-ui/react'
import { useUser } from '@supabase/auth-helpers-react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useCreatePostMutation, useGetUrlMetadataMutation } from '../../../codegen/graphql'
import { I18nContext } from '../../i18n/i18n-react'
import { getI18nProps } from '../../utils/getI18nProps'

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

export const GET_URL_METADATA = gql`
  mutation getUrlMetadata($input: GetUrlMetadataInput!) {
    getUrlMetadata(input: $input) {
      url
      title
    }
  }
`

const PostCreate: NextPage = () => {
  const { LL } = useContext(I18nContext)
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

  if (!user) return <Center p='30px'>{LL.MISC.YOU_NEED_TO_SIGN_IN_FIRST()}</Center>
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
      <Heading size='lg'>{LL.PAGE.POST.CREATE.TITLE()}</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl mt='4' isInvalid={!!errors.url}>
          <FormLabel htmlFor='url'>{LL.SCHEMA.TYPE.POST.URL()}</FormLabel>
          <Input
            id='url'
            {...register('url', {
              onChange: onChangeUrl,
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
          <FormLabel htmlFor='title'>{LL.SCHEMA.TYPE.POST.TITLE()}</FormLabel>
          <Input
            id='title'
            {...register('title', {
              required: 'This is required'
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <Text mt='4'>{LL.PAGE.POST.CREATE.NOTE()}</Text>
        <Button mt={4} isLoading={isSubmitting} type='submit'>
          {LL.COMPONENT.BUTTON.SUBMIT()}
        </Button>
      </form>
    </Box>
  )
}

export default PostCreate

export const getStaticProps = getI18nProps