import { useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
} from '@chakra-ui/react'

const PostCreate = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values: any) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve()
      }, 3000)
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